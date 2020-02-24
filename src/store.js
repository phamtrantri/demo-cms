import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import Immutable from 'seamless-immutable';

import reducers from 'reducers';
import sagas from 'sagas';

export const history = createBrowserHistory();

// create root reducer
const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  });

// track saga
const saga = createSagaMiddleware();

// create middlewares
const middlewares = [saga];
const enhancers = [applyMiddleware(routerMiddleware(history), ...middlewares)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  rootReducer(history),
  Immutable({}),
  composeEnhancers(...enhancers)
);

saga.run(sagas);

export default store;
