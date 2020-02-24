import { takeLatest, put } from 'redux-saga/effects';

import { api } from 'services';

import { setItem } from 'utils/storage';

import { province } from '../../reducers';

const { types } = province;

function storeAfterGetting({ payload }) {
  try {
    setItem('provinces', payload);
  } catch (error) {
    console.log(error);
  }
}
function* getListAfterModifying() {
  try {
    yield put({
      type: types.GET_ALL_AJAX,
      payload: {
        countApi: api.countProvinces,
        api: api.getProvincesWithPaging,
        params: { page: 1, pageSize: 200 }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
// prettier-ignore
const watchers = function*() {
  yield takeLatest(types.GET_ALL_SUCCEEDED, storeAfterGetting)
  yield takeLatest([types.INSERT_SUCCEEDED, types.DELETE_SUCCEEDED, types.UPDATE_SUCCEEDED], getListAfterModifying)
};

export default watchers();
