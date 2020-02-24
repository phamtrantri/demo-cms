import { takeLatest, call, all, put } from 'redux-saga/effects';

import { api } from 'services';

import { resource, app } from '../../reducers';

const { types } = resource;

function* uploadResource({ payload: { type, file, onSuccess } }) {
  try {
    const res = yield call(api.uploadResource, { type, file });
    if (res.ok && res.success) {
      yield put({
        type: types.UPLOAD_RESOURCE_SUCCEEDED
      });
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(res.payload.data);
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message, ...res }
        }),
        put({
          type: types.UPLOAD_RESOURCE_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.UPLOAD_RESOURCE_FAILED,
      payload: { error }
    });
  }
}

// prettier-ignore
const watchers = function*() {
  yield takeLatest(types.UPLOAD_RESOURCE, uploadResource)
};

export default watchers();
