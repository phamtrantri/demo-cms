import { takeLatest, put } from 'redux-saga/effects';

import { workingSchedule as api } from 'services';

import { workingSchedule } from '../../reducers';

const { types } = workingSchedule;

function* getListAfterModifying() {
  try {
    yield put({
      type: types.GET_ALL_AJAX,
      payload: {
        countApi: api.countWorkingSchedules,
        api: api.getWorkingSchedules,
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
