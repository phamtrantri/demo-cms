import {
  takeLatest,
  call,
  all,
  put,
  takeEvery,
  race,
  delay,
  take
} from 'redux-saga/effects';
import { head, split, concat } from 'lodash';

import { actionSuffixes, DEFAULT_PAGE_SIZE } from '../constants';

import { app, auth } from '../reducers';
import { emitter } from 'emitter';
import store from 'store';
import * as errorCode from '../utils/error_code';

// import { emitter } from '../globalEvent';

const {
  GET_ALL_AJAX,
  GET_ALL_SUCCEEDED,
  GET_ALL_FAILED,
  GET_ALL_CANCELLED,

  GET_AJAX,
  GET_SUCCEEDED,
  GET_FAILED,
  GET_CLEAN,

  INSERT_AJAX,
  INSERT_SUCCEEDED,
  INSERT_FAILED,

  UPDATE_AJAX,
  UPDATE_SUCCEEDED,
  UPDATE_FAILED,

  DELETE_AJAX,
  DELETE_SUCCEEDED,
  DELETE_FAILED
} = actionSuffixes;

// get all saga
const getAllSaga = function*({ type, payload: { countApi, api, params } }) {
  try {
    if (countApi) {
      const { countRes } = yield race({
        countRes: call(countApi, params),
        cancel: take(
          `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_CANCELLED}`
        )
      });

      if (countRes) {
        if (countRes.ok && countRes.success) {
          const count = countRes.payload.data;
          if (count === 0) {
            yield put({
              type: `${head(
                split(type, `${GET_ALL_AJAX}`)
              )}${GET_ALL_SUCCEEDED}`,
              payload: {
                data: [],
                totalItems: count
              }
            });
          } else {
            let totalPages = 1;
            if (count > DEFAULT_PAGE_SIZE) {
              totalPages = Math.ceil(count / DEFAULT_PAGE_SIZE);
            }

            const { res } = yield race({
              res: all(
                new Array(totalPages).fill(1).map((i, idx) => {
                  return call(api, {
                    ...params,
                    page: idx + 1,
                    pageSize: DEFAULT_PAGE_SIZE
                  });
                })
              ),
              cancel: take(
                `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_CANCELLED}`
              )
            });

            if (res) {
              yield delay(100);

              const dataRes = res
                .filter(item => item.ok && item.success)
                .map(i => i.payload.data);

              if (dataRes.length === 0) {
                yield all([
                  put({
                    type: app.types.SET_ERROR_ALERT,
                    payload: {
                      content:
                        res[0].payload && res[0].payload.message
                          ? res[0].payload.message
                          : res[0].message,
                      ...res[0]
                    }
                  }),
                  put({
                    type: `${head(
                      split(type, `${GET_ALL_AJAX}`)
                    )}${GET_ALL_FAILED}`,
                    payload: { error: res[0] }
                  })
                ]);
              } else {
                const data = dataRes.reduce((acc, i) => concat(acc, i), []);

                yield put({
                  type: `${head(
                    split(type, `${GET_ALL_AJAX}`)
                  )}${GET_ALL_SUCCEEDED}`,
                  payload: { data, totalItems: count }
                });
              }
            }
          }
        } else {
          yield all([
            put({
              type: app.types.SET_ERROR_ALERT,
              payload: {
                content:
                  countRes.payload && countRes.payload.message
                    ? countRes.payload.message
                    : countRes.message,
                ...countRes
              }
            }),
            put({
              type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_FAILED}`,
              payload: { error: countRes }
            })
          ]);
        }
      }
    } else {
      const { res } = yield race({
        res: call(api, params),
        cancel: take(
          `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_CANCELLED}`
        )
      });
      // const res = yield call(api, params);
      if (res) {
        if (res.ok && res.success) {
          const { data, total } = res.payload;
          yield put({
            type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_SUCCEEDED}`,
            payload: {
              data,
              totalItems: total
            }
          });
        } else {
          yield all([
            put({
              type: app.types.SET_ERROR_ALERT,
              payload: {
                content:
                  res.payload && res.payload.message
                    ? res.payload.message
                    : res.message,
                ...res
              }
            }),
            put({
              type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_FAILED}`,
              payload: { error: res }
            })
          ]);
        }
      }
    }
  } catch (error) {
    console.log('error', error);
    yield all([
      put({ type: app.types.SET_ERROR_ALERT }),
      put({
        type: `${head(split(type, `${GET_ALL_AJAX}`))}${GET_ALL_FAILED}`,
        payload: { error }
      })
    ]);
  }
};

// get saga
const getSaga = function*({ type, payload: { api, id, onSuccess } }) {
  try {
    yield put({
      type: `${head(split(type, `${GET_AJAX}`))}${GET_CLEAN}`
    });
    const res = yield call(api, id);

    if (res.ok && res.success) {
      yield put({
        type: `${head(split(type, `${GET_AJAX}`))}${GET_SUCCEEDED}`,
        payload: { data: res.payload }
      });
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(res.payload);
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: {
            content:
              res.payload && res.payload.message
                ? res.payload.message
                : res.message,
            ...res
          }
        }),
        put({
          type: `${head(split(type, `${GET_AJAX}`))}${GET_FAILED}`,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log('error', error);
    yield all([
      put({ type: app.types.SET_ERROR_ALERT }),
      put({
        type: `${head(split(type, `${GET_AJAX}`))}${GET_FAILED}`,
        payload: { error }
      })
    ]);
  }
};

// insert saga
const insertSaga = function*({ type, payload: { api, params, onSuccess } }) {
  try {
    const res = yield call(api, params);

    if (res.ok && res.success) {
      yield all([
        put({
          type: `${head(split(type, `${INSERT_AJAX}`))}${INSERT_SUCCEEDED}`,
          payload: { data: res.payload }
        }),
        put({
          type: app.types.SET_ALERT,
          payload: { type: 'success', content: res.message }
        })
      ]);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: {
            content:
              res.payload && res.payload.message
                ? res.payload.message
                : res.message,
            ...res
          }
        }),
        put({
          type: `${head(split(type, `${INSERT_AJAX}`))}${INSERT_FAILED}`,
          payload: { error: { ...res } }
        })
      ]);
    }
  } catch (error) {
    console.log('error', error);
    yield all([
      put({ type: app.types.SET_ERROR_ALERT }),
      put({
        type: `${head(split(type, `${INSERT_AJAX}`))}${INSERT_FAILED}`,
        payload: { error }
      })
    ]);
  }
};

// update saga
const updateSaga = function*({ type, payload: { api, params } }) {
  try {
    const res = yield call(api, params);

    if (res.ok && res.success) {
      yield all([
        put({
          type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_SUCCEEDED}`,
          payload: { data: res.payload }
        }),
        put({
          type: app.types.SET_ALERT,
          payload: { type: 'success', content: res.message }
        })
      ]);
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: {
            content:
              res.payload && res.payload.message
                ? res.payload.message
                : res.message,
            ...res
          }
        }),
        put({
          type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_FAILED}`,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log('error', error);
    yield all([
      put({ type: app.types.SET_ERROR_ALERT }),
      put({
        type: `${head(split(type, `${UPDATE_AJAX}`))}${UPDATE_FAILED}`,
        payload: { error }
      })
    ]);
  }
};

// delete saga
const deleteSaga = function*({ type, payload: { api, params } }) {
  try {
    const res = yield call(api, params);
    if (res.ok && res.success) {
      yield all([
        put({
          type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_SUCCEEDED}`,
          payload: { data: res.payload }
        }),
        put({
          type: app.types.SET_ALERT,
          payload: { type: 'success', content: res.message }
        })
      ]);
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: {
            content:
              res.payload && res.payload.message
                ? res.payload.message
                : res.message,
            ...res
          }
        }),
        put({
          type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_FAILED}`,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log('error', error);
    yield all([
      put({ type: app.types.SET_ERROR_ALERT }),
      put({
        type: `${head(split(type, `${DELETE_AJAX}`))}${DELETE_FAILED}`,
        payload: { error }
      })
    ]);
  }
};

// set alert
const setAlert = function({ payload }) {
  try {
    emitter.emit('alert', {
      buttons: [{ text: 'Quay lại', toggleAfterPressed: true }],
      ...(payload ? payload : {}),
      type: 'alert'
    });
  } catch (error) {
    console.log('error', error);
  }
};

// set error alert
const setErrorAlert = function({ payload }) {
  try {
    let buttons = [{ text: 'Quay lại', toggleAfterPressed: true }];
    let type = 'danger';

    if (
      payload &&
      payload.code === errorCode.ERROR_CODE_AUTHENTICATED_FAILURE
    ) {
      buttons = [
        {
          text: 'Quay lại',
          toggleAfterPressed: true,
          onPress: () =>
            store.dispatch({
              type: auth.types.SIGN_OUT
            })
        }
      ];
    }

    if (payload && payload.code === errorCode.ERROR_CODE_DELETE_FAILURE) {
      type = 'warning';
    }

    emitter.emit('alert', {
      buttons,
      ...(payload ? payload : {}),
      type: type
    });
  } catch (error) {
    console.log('error', error);
  }
};

// prettier-ignore
const watchers = function*() {
  yield takeEvery(action => action.type.endsWith(`${GET_ALL_AJAX}`), getAllSaga);
  yield takeLatest(action => action.type.endsWith(`${GET_AJAX}`), getSaga);
  yield takeLatest(action => action.type.endsWith(`${INSERT_AJAX}`), insertSaga);
  yield takeLatest(action => action.type.endsWith(`${UPDATE_AJAX}`), updateSaga);
  yield takeLatest(action => action.type.endsWith(`${DELETE_AJAX}`), deleteSaga);
  yield takeLatest(app.types.SET_ALERT, setAlert);
  yield takeLatest(app.types.SET_ERROR_ALERT, setErrorAlert);
};

export default watchers();
