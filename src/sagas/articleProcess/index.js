import { takeLatest, put } from 'redux-saga/effects';

import { api } from 'services';

import { articleProcess } from '../../reducers';
import { CATEGORY_TYPE } from '../../constants';

const { types } = articleProcess;

function* getListAfterModifying() {
  try {
    yield put({
      type: types.GET_ALL_AJAX,
      payload: {
        countApi: api.countArticles,
        api: api.getArticles,
        params: {
          page: 1,
          pageSize: 200,
          type: CATEGORY_TYPE.QUY_TRINH,
        }
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