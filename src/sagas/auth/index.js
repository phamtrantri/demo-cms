import { takeLatest, call, all, put } from 'redux-saga/effects';

import { api } from 'services';

import { auth, app } from '../../reducers';
import { push } from 'connected-react-router';
import { client } from 'services';
import { setItem, removeItem } from 'utils/storage';
import { encryptNakedToSystem } from 'utils/crypto';

const { types } = auth;

function* login({ payload: { params, onSuccess } }) {
  try {
    const res = yield call(api.login, params);
    if (res.ok && res.success && res.payload && res.payload.token) {
      const encryptedData = encryptNakedToSystem(JSON.stringify(res.payload));
      setItem('token', encryptedData);
      client.setHeader('Authorization', `Bearer ${res.payload.token}`);
      yield put({
        type: types.SIGN_IN_SUCCEEDED,
        payload: { ...res.payload }
      });
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message }
        }),
        put({
          type: types.SIGN_IN_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.SIGN_IN_FAILED,
      payload: { error }
    });
  }
}

function* logout() {
  removeItem('token');
  client.deleteHeader('Authorization');
  yield put(push('/admin/authorization/login'));
}

function* changePassword({ payload: { params, onSuccess } }) {
  try {
    const res = yield call(api.changePassword, params);
    if (res.ok && res.success) {
      yield all([
        put({
          type: types.CHANGE_PASSWORD_SUCCEEDED
        }),
        put({
          type: app.types.SET_ALERT,
          payload: {
            type: 'success',
            content: 'Đổi mật khẩu thành công'
          }
        })
      ]);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message }
        }),
        put({
          type: types.CHANGE_PASSWORD_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CHANGE_PASSWORD_FAILED,
      payload: { error }
    });
  }
}

function* requestResetPassword({ payload }) {
  try {
    const params = {
      account_type: 4,
      email: payload,
      endpoint: `${window.location.origin}/reset-password?token=`
    };
    const res = yield call(api.requestResetPassword, params);
    if (res.ok && res.success) {
      yield all([
        put({
          type: types.REQUEST_RESET_PASSWORD_SUCCEEDED
        }),
        put({
          type: app.types.SET_ALERT,
          payload: {
            type: 'success',
            content: 'Link đổi mật khẩu đã được gửi đến email của bạn.'
          }
        })
      ]);
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message }
        }),
        put({
          type: types.REQUEST_RESET_PASSWORD_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.REQUEST_RESET_PASSWORD_FAILED,
      payload: { error }
    });
  }
}

function* resetPassword({ payload: { params, onSuccess } }) {
  try {
    const res = yield call(api.resetPassword, params);
    if (res.ok && res.success) {
      yield all([
        put({
          type: types.RESET_PASSWORD_SUCCEEDED
        }),
        put({
          type: app.types.SET_ALERT,
          payload: { type: 'success', content: 'Đổi mật khẩu thành công' }
        })
      ]);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } else {
      yield all([
        put({
          type: app.types.SET_ERROR_ALERT,
          payload: { content: res.message }
        }),
        put({
          type: types.RESET_PASSWORD_FAILED,
          payload: { error: res }
        })
      ]);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.REQUEST_RESET_PASSWORD_FAILED,
      payload: { error }
    });
  }
}

// prettier-ignore
const watchers = function*() {
  yield takeLatest(types.SIGN_IN, login)
  yield takeLatest(types.SIGN_OUT, logout)
  yield takeLatest(types.CHANGE_PASSWORD, changePassword)
  yield takeLatest(types.REQUEST_RESET_PASSWORD, requestResetPassword)
  yield takeLatest(types.RESET_PASSWORD, resetPassword)
};

export default watchers();
