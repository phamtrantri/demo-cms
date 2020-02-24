import { takeLatest, put } from 'redux-saga/effects';

import { api } from 'services';

import { photo } from '../../reducers';

const { types } = photo;

function* getListAfterModifying() {
  try {
    yield put({
      type: types.GET_ALL_AJAX,
      payload: {
        countApi: api.countPhotos,
        api: api.getPhotos,
        params: { page: 1, pageSize: 200, status: 1 }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// prettier-ignore
const watchers = function*() {
  yield takeLatest([types.INSERT_SUCCEEDED, types.DELETE_SUCCEEDED, types.UPDATE_SUCCEEDED], getListAfterModifying)
};

export default watchers();
