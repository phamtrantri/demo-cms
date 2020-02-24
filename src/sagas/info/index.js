import { takeLatest, call, all, put } from 'redux-saga/effects';

import { api } from 'services';

import { info, app } from '../../reducers';

const { types } = info;

function* getInfo() {
  try {
    const res = yield call(api.getInfo);
    if (res.ok && res.success) {
      yield put({
        type: types.GET_INFO_SUCCEEDED,
        payload: { data: res.payload }
      });
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message, ...res }
        }),
        put({
          type: types.GET_INFO_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_INFO_FAILED,
      payload: { error }
    });
  }
}

function* updateInfo({ payload }) {
  try {
    const res = yield call(api.updateInfo, payload);
    if (res.ok && res.success) {
      yield all([
        put({
          type: types.UPDATE_INFO_SUCCEEDED,
          payload: {}
        }),
        put({
          type: app.types.SET_ALERT,
          payload: { type: 'success', content: 'Cập nhật thành công' }
        })
      ]);
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message, ...res }
        }),
        put({
          type: types.UPDATE_INFO_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.UPDATE_INFO_FAILED,
      payload: { error }
    });
  }
}

// prettier-ignore
const watchers = function*() {
  yield takeLatest(types.GET_INFO, getInfo)
  yield takeLatest(types.UPDATE_INFO, updateInfo)
};

export default watchers();
