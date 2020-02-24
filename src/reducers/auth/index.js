import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

import { ajaxSuffixes } from '../../constants';

const types = {
  SIGN_IN: `SIGN_IN${ajaxSuffixes.AJAX_CALL}`,
  SIGN_IN_SUCCEEDED: `SIGN_IN${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  SIGN_IN_FAILED: `SIGN_IN${ajaxSuffixes.AJAX_CALL_FAILED}`,
  SIGN_IN_CANCELLED: `SIGN_IN${ajaxSuffixes.AJAX_CALL_CANCELLED}`,

  SIGN_OUT: 'SIGN_OUT',

  CHANGE_PASSWORD: `CHANGE_PASSWORD${ajaxSuffixes.AJAX_CALL}`,
  CHANGE_PASSWORD_SUCCEEDED: `CHANGE_PASSWORD${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  CHANGE_PASSWORD_FAILED: `CHANGE_PASSWORD${ajaxSuffixes.AJAX_CALL_FAILED}`,

  REQUEST_RESET_PASSWORD: `REQUEST_RESET_PASSWORD${ajaxSuffixes.AJAX_CALL}`,
  REQUEST_RESET_PASSWORD_SUCCEEDED: `REQUEST_RESET_PASSWORD${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  REQUEST_RESET_PASSWORD_FAILED: `REQUEST_RESET_PASSWORD${ajaxSuffixes.AJAX_CALL_FAILED}`,

  RESET_PASSWORD: `RESET_PASSWORD${ajaxSuffixes.AJAX_CALL}`,
  RESET_PASSWORD_SUCCEEDED: `RESET_PASSWORD${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  RESET_PASSWORD_FAILED: `RESET_PASSWORD${ajaxSuffixes.AJAX_CALL_FAILED}`
};

const actions = createActions({
  [types.SIGN_IN]: undefined,
  [types.SIGN_IN_SUCCEEDED]: undefined,
  [types.SIGN_IN_FAILED]: undefined,
  [types.SIGN_IN_CANCELLED]: undefined,

  [types.SIGN_OUT]: undefined,

  [types.CHANGE_PASSWORD]: undefined,
  [types.CHANGE_PASSWORD_SUCCEEDED]: undefined,
  [types.CHANGE_PASSWORD_FAILED]: undefined,

  [types.REQUEST_RESET_PASSWORD]: undefined,
  [types.REQUEST_RESET_PASSWORD_SUCCEEDED]: undefined,
  [types.REQUEST_RESET_PASSWORD_FAILED]: undefined,

  [types.RESET_PASSWORD]: undefined,
  [types.RESET_PASSWORD_SUCCEEDED]: undefined,
  [types.RESET_PASSWORD_FAILED]: undefined
});

const reducer = handleActions(
  {
    [types.SIGN_IN]: state => {
      return state.set('isSigningIn', true).set('loginError', {});
    },
    [types.SIGN_IN_SUCCEEDED]: (state, { payload }) => {
      const { token, account_detail } = payload;

      let roles = [];
      account_detail.role_detail.roles.map(item => {
        roles.push(item.code);
      });

      // cms_admin
      // cms_registration_manager

      let role = '';

      if (!role && roles.includes('partner_hospital_admin')) {
        role = 'cms_admin';
      }
      if (!role && roles.includes('partner_hospital_web_user')) {
        role = 'cms_registration_manager';
      }
      if (!role && roles.includes('hospitalsbox_hospital_admin')) {
        role = 'cms_admin';
      }

      let user = {
        ...account_detail.account,
        // roles: roles,
        role: role
      };

      return state
        .set('isSigningIn', false)
        .set('user', user)
        .set('token', token);
    },
    [types.SIGN_IN_FAILED]: (state, { payload: { error } }) => {
      return state.set('isSigningIn', false).set('loginError', error);
    },

    [types.SIGN_OUT]: state => {
      return state.set('token', '').set('user', {});
    },

    [types.CHANGE_PASSWORD]: state => {
      return state.set('isChangingPassword', true).set('changeError', {});
    },
    [types.CHANGE_PASSWORD_SUCCEEDED]: state => {
      return state.set('isChangingPassword', false);
    },
    [types.CHANGE_PASSWORD_FAILED]: (state, { payload: { error } }) => {
      return state.set('isChangingPassword', false).set('changeError', error);
    },

    [types.REQUEST_RESET_PASSWORD]: state => {
      return state.set('isRequesting', true).set('requestError', {});
    },
    [types.REQUEST_RESET_PASSWORD_SUCCEEDED]: state => {
      return state.set('isRequesting', false);
    },
    [types.REQUEST_RESET_PASSWORD_FAILED]: (state, { payload: { error } }) => {
      return state.set('isRequesting', false).set('requestError', error);
    },

    [types.RESET_PASSWORD]: state => {
      return state.set('isResetting', true).set('resetError', {});
    },
    [types.RESET_PASSWORD_SUCCEEDED]: state => {
      return state.set('isResetting', false);
    },
    [types.RESET_PASSWORD_FAILED]: (state, { payload: { error } }) => {
      return state.set('isResetting', false).set('resetError', error);
    }
  },
  Immutable({})
);

const select = state => {
  return state['auth'];
};

const selectors = {
  token: createSelector(select, f => {
    return Immutable.asMutable(f.token || '');
  }),
  user: createSelector(select, f => {
    return Immutable.asMutable(f.user || {});
  }),

  isSigningIn: createSelector(select, f => {
    return f.isSigningIn;
  }),
  isChangingPassword: createSelector(select, f => {
    return f.isChangingPassword;
  }),
  isRequesting: createSelector(select, f => {
    return f.isRequesting;
  }),
  isResetting: createSelector(select, f => {
    return f.isResetting;
  }),

  loginError: createSelector(select, f => {
    return f.loginError;
  }),
  changeError: createSelector(select, f => {
    return f.loginError;
  }),
  requestError: createSelector(select, f => {
    return f.requestError;
  }),
  resetError: createSelector(select, f => {
    return f.resetError;
  })
};

export { reducer, actions, selectors, types };
