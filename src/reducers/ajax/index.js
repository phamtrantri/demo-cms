import Immutable from 'seamless-immutable';

import { ajaxSuffixes } from '../../constants';

const {
  AJAX_CALL,
  AJAX_CALL_SUCCEEDED,
  AJAX_CALL_FAILED,
  AJAX_CALL_CANCELLED
} = ajaxSuffixes;

export const reducer = (state = Immutable({}), action) => {
  const indexOfDelimiter = action.type.lastIndexOf('_');
  const ajaxName = action.type.substring(0, indexOfDelimiter);
  const ajaxStatus = action.type.substring(indexOfDelimiter);

  switch (ajaxStatus) {
    case AJAX_CALL:
      return state.set(ajaxName, (state[ajaxName] || 0) + 1);
    case AJAX_CALL_SUCCEEDED:
    case AJAX_CALL_FAILED:
      if (state[ajaxName]) {
        return state.set(ajaxName, (state[ajaxName] || 0) - 1);
      }
      return state;
    case AJAX_CALL_CANCELLED:
      if (state[ajaxName]) {
        return state.set(ajaxName, 0);
      }
      return state;
    default:
      return state;
  }
};

export const selectAjax = state => {
  return state['ajax'];
};
