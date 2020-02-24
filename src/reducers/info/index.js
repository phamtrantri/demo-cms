import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

import { ajaxSuffixes } from '../../constants';

const types = {
  GET_INFO: `GET_INFO${ajaxSuffixes.AJAX_CALL}`,
  GET_INFO_SUCCEEDED: `GET_INFO${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  GET_INFO_FAILED: `GET_INFO${ajaxSuffixes.AJAX_CALL_FAILED}`,
  GET_INFO_CANCELLED: `GET_INFO${ajaxSuffixes.AJAX_CALL_CANCELLED}`,

  UPDATE_INFO: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL}`,
  UPDATE_INFO_SUCCEEDED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_SUCCEEDED}`,
  UPDATE_INFO_FAILED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_FAILED}`,
  UPDATE_INFO_CANCELLED: `UPDATE_INFO${ajaxSuffixes.AJAX_CALL_CANCELLED}`
};

const actions = createActions({
  [types.GET_INFO]: undefined,
  [types.GET_INFO_SUCCEEDED]: undefined,
  [types.GET_INFO_FAILED]: undefined,
  [types.GET_INFO_CANCELLED]: undefined,

  [types.UPDATE_INFO]: undefined,
  [types.UPDATE_INFO_SUCCEEDED]: undefined,
  [types.UPDATE_INFO_FAILED]: undefined,
  [types.UPDATE_INFO_CANCELLED]: undefined
});

const reducer = handleActions(
  {
    [types.GET_INFO]: state => {
      return state.set('isLoading', true).set('getError', {});
    },
    [types.GET_INFO_SUCCEEDED]: (state, { payload: { data } }) => {
      return state
        .set('isLoading', false)
        .set('data', data)
        .set('getError', {});
    },
    [types.GET_INFO_FAILED]: (state, { payload: { error } }) => {
      return state.set('isLoading', false).set('getError', error);
    },

    [types.UPDATE_INFO]: state => {
      return state.set('isUpdating', true).set('updateError', {});
    },
    [types.UPDATE_INFO_SUCCEEDED]: state => {
      return state.set('isUpdating', false).set('updateError', {});
    },
    [types.UPDATE_INFO_FAILED]: (state, { payload: { error } }) => {
      return state.set('isUpdating', false).set('updateError', error);
    }
  },
  Immutable({})
);

const select = state => {
  return state['info'];
};

const selectors = {
  data: createSelector(select, f => {
    return Immutable.asMutable(f.data || {}, { deep: true });
  }),

  isLoading: createSelector(select, f => {
    return f.isLoading;
  }),
  isUpdating: createSelector(select, f => {
    return f.isUpdating;
  }),

  getError: createSelector(select, f => {
    return f.getError;
  }),
  updateError: createSelector(select, f => {
    return f.updateError;
  })
};

export { reducer, actions, selectors, types };
