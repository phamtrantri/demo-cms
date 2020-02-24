import { reduce, toUpper, snakeCase, flow } from 'lodash';
import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

import { actionSuffixes, ajaxSuffixes } from '../constants';

const { AJAX_CALL_SUCCEEDED, AJAX_CALL_FAILED } = ajaxSuffixes;

const upperCase = flow(snakeCase, toUpper);

const reduxGenerator = featureName => {
  const featureNameUpperCase = upperCase(featureName);

  const types = reduce(
    actionSuffixes,
    (acc, value, key) => {
      return {
        ...acc,
        [key]: `${featureNameUpperCase}_${key}`
      };
    },
    {}
  );

  const actions = createActions(
    reduce(
      types,
      (acc, value, key) => {
        let func = null;
        if (key.endsWith(AJAX_CALL_SUCCEEDED)) {
          func = data => {
            return { ...data };
          };
        } else if (key.endsWith(AJAX_CALL_FAILED)) {
          func = error => {
            return { error };
          };
        }

        return {
          ...acc,
          [value]: func
        };
      },
      {}
    )
  );

  const reducer = handleActions(
    {
      [types.GET_ALL_AJAX]: state => {
        return state.set('getAllError', {});
      },
      [types.GET_ALL_SUCCEEDED]: (state, { payload: { data, totalItems } }) => {
        return state.set('items', data).set('totalItems', totalItems);
        // .set('page', page)
        // .set('sizePerPage', sizePerPage)
        // .set('filter', filter);
      },
      [types.GET_ALL_FAILED]: (state, { payload: { error } }) => {
        return state.set('getAllError', error);
      },
      [types.GET_ALL_CLEAN]: state => {
        return state.set('items', []).set('getAllError', {});
      },
      [types.GET_ALL_CANCELLED]: state => {
        return state;
      },

      [types.GET_AJAX]: state => {
        return state.set('item', {}).set('getError', {});
      },
      [types.GET_SUCCEEDED]: (state, { payload: { data } }) => {
        return state.set('item', data);
      },
      [types.GET_FAILED]: (state, { payload: { error } }) => {
        return state.set('getError', error);
      },
      [types.GET_CLEAN]: state => {
        return state.set('item', {}).set('getError', {});
      },

      [types.INSERT_AJAX]: state => {
        return state
          .set('isInsertSucceeded', undefined)
          .set('insertError', undefined);
      },
      [types.INSERT_SUCCEEDED]: state => {
        return state
          .set('insertError', undefined)
          .set('isInsertSucceeded', true);
      },
      [types.INSERT_FAILED]: (state, { payload: { error } }) => {
        return state.set('insertError', error);
      },
      [types.INSERT_CLEAN]: state => {
        return state.set('insertError', {}).set('isInsertSucceeded', false);
      },

      [types.UPDATE_AJAX]: state => {
        return state
          .set('isUpdateSucceeded', undefined)
          .set('updateError', undefined);
      },
      [types.UPDATE_SUCCEEDED]: state => {
        return state.set('isUpdateSucceeded', true);
      },
      [types.UPDATE_FAILED]: (state, { payload: { error } }) => {
        return state.set('updateError', error).set('isUpdateSucceeded', false);
      },
      [types.UPDATE_CLEAN]: state => {
        return state.set('updateError', {}).set('isUpdateSucceeded', false);
      },

      [types.DELETE_AJAX]: state => {
        return state
          .set('isDeleteSucceeded', undefined)
          .set('deleteError', undefined);
      },
      [types.DELETE_SUCCEEDED]: state => {
        return state.set('isDeleteSucceeded', true);
      },
      [types.DELETE_FAILED]: (state, { payload: { error } }) => {
        return state.set('deleteError', error);
      },
      [types.DELETE_CLEAN]: state => {
        return state.set('deleteError', {}).set('isDeleteSucceeded', false);
      }
    },
    Immutable({})
  );

  const select = state => {
    return state[featureName];
  };

  const selectAjax = state => {
    return state['ajax'];
  };

  const selectors = {
    items: createSelector(select, f => {
      return Immutable.asMutable(f.items || [], { deep: true });
    }),
    totalItems: createSelector(select, f => {
      return Immutable.asMutable(f.totalItems);
    }),
    page: createSelector(select, f => {
      return Immutable.asMutable(f.page);
    }),
    sizePerPage: createSelector(select, f => {
      return Immutable.asMutable(f.sizePerPage);
    }),
    item: createSelector(select, f => {
      return Immutable.asMutable(f.item || {}, { deep: true });
    }),

    insertError: createSelector(select, f => {
      return f.insertError;
    }),
    isInsertSucceeded: createSelector(select, f => {
      return f.isInsertSucceeded;
    }),
    isUpdateSucceeded: createSelector(select, f => {
      return f.isUpdateSucceeded;
    }),
    isDeleteSucceeded: createSelector(select, f => {
      return f.isDeleteSucceeded;
    }),

    isLoadingItems: createSelector(selectAjax, ajax => {
      return ajax[`${featureNameUpperCase}_GET_ALL`];
    }),
    isLoadingItem: createSelector(selectAjax, ajax => {
      return ajax[`${featureNameUpperCase}_GET`] === 1;
    }),
    isInserting: createSelector(selectAjax, ajax => {
      return ajax[`${featureNameUpperCase}_INSERT`] === 1;
    }),
    isUpdating: createSelector(selectAjax, ajax => {
      return ajax[`${featureNameUpperCase}_UPDATE`] === 1;
    }),
    isDeleting: createSelector(selectAjax, ajax => {
      return ajax[`${featureNameUpperCase}_DELETE`] === 1;
    })
  };

  return {
    types,
    actions,
    reducer,
    select,
    selectors
  };
};

export { reduxGenerator };
