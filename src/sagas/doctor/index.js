import { takeLatest, put } from 'redux-saga/effects';

import { api } from 'services';

import { doctor } from '../../reducers';

const { types } = doctor;

function* getListAfterModifying() {
  try {
    yield put({
      type: types.GET_ALL_AJAX,
      payload: {
        countApi: api.countDoctors,
        api: api.getDoctors,
        params: { page: 1, pageSize: 200 }
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
