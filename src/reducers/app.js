import { createActions, handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';

const types = {
  SET_ALERT: 'SET_ALERT',
  SET_ERROR_ALERT: 'SET_ERROR_ALERT'
};

const actions = createActions({
  [types.SET_ALERT]: undefined,
  [types.SET_ERROR_ALERT]: undefined
});

const reducer = handleActions({}, Immutable({}));

const selectors = {};

export { types, actions, selectors, reducer };
