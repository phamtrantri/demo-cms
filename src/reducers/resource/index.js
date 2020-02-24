import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

import { ajaxSuffixes } from '../../constants';

const types = {
  UPLOAD_RESOURCE: `UPLOAD_RESOURCE${ajaxSuffixes.AJAX_CALL}`,
  UPLOAD_RESOURCE_SUCCEEDED: `UPLOAD_RESOURCE${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  UPLOAD_RESOURCE_FAILED: `UPLOAD_RESOURCE${ajaxSuffixes.AJAX_CALL_FAILED}`,
  UPLOAD_RESOURCE_CANCELLED: `UPLOAD_RESOURCE${ajaxSuffixes.AJAX_CALL_CANCELLED}`

  // UPDATE_INFO: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL}`,
  // UPDATE_INFO_SUCCEEDED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  // UPDATE_INFO_FAILED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_FAILED}`,
  // UPDATE_INFO_CANCELLED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_CANCELLED}`
};

const actions = createActions({
  [types.UPLOAD_RESOURCE]: undefined,
  [types.UPLOAD_RESOURCE_SUCCEEDED]: undefined,
  [types.UPLOAD_RESOURCE_FAILED]: undefined,
  [types.UPLOAD_RESOURCE_CANCELLED]: undefined

  // [types.UPDATE_INFO]: undefined,
  // [types.UPDATE_INFO_SUCCEEDED]: undefined,
  // [types.UPDATE_INFO_FAILED]: undefined,
  // [types.UPDATE_INFO_CANCELLED]: undefined
});

const reducer = handleActions(
  {
    [types.UPLOAD_RESOURCE]: state => {
      return state.set('isLoading', true).set('uploadError', {});
    },
    [types.UPLOAD_RESOURCE_SUCCEEDED]: state => {
      return state.set('isLoading', false).set('uploadError', {});
    },
    [types.UPLOAD_RESOURCE_FAILED]: (state, { payload: { error } }) => {
      return state.set('isLoading', false).set('uploadError', error);
    }

    // [types.UPDATE_INFO]: state => {
    //   return state.set('isUpdating', true).set('updateError', {});
    // },
    // [types.UPDATE_INFO_SUCCEEDED]: state => {
    //   return state.set('isUpdating', false).set('updateError', {});
    // },
    // [types.UPDATE_INFO_FAILED]: (state, { payload: { error } }) => {
    //   return state.set('isUpdating', false).set('updateError', error);
    // }
  },
  Immutable({})
);

const select = state => {
  return state['info'];
};

const selectors = {
  isLoading: createSelector(select, f => {
    return f.isLoading;
  }),
  // isUpdating: createSelector(select, f => {
  //   return f.isUpdating;
  // }),

  uploadError: createSelector(select, f => {
    return f.uploadError;
  })
  // updateError: createSelector(select, f => {
  //   return f.updateError;
  // })
};

export { reducer, actions, selectors, types };
