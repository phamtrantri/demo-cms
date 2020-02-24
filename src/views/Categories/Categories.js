import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { category, app } from 'reducers';
import { api } from 'services';

// import { formatStr } from 'utils/format';
import { tableConstants } from 'utils/table';
import { MENU_MAP, CATEGORY_TYPE_MAP } from '../../constants';
import Handle from 'components/Handle/index';

function Categories(props) {
  // eslint-disable-next-line react/prop-types
  const { t, categories, isLoading, history } = props;

  useEffect(() => {
    props.getCategories({
      countApi: api.countCategories,
      api: api.getCategories,
      params: { page: 1, pageSize: 200 }
    });
    return () => {
      props.cancel();
    };
  }, []);

  const columns = [
    {
      title: t('stt'),
      field: 'index'
    },
    {
      title: t('language'),
      field: 'language',
    },
    {
      title: t('categoryType'),
      field: 'typeName'
    },
    {
      title: t('title'),
      field: 'title',
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('handle'),
      field: 'handle',
      render: rowData => {
        return (
          <Handle handle={rowData.handle}></Handle>
        );
      }
    },
    {
      title: t('childCategory'),
      field: 'child_categories'
    },
    {
      title: t('menu'),
      field: 'menu_index',
      lookup: MENU_MAP,
      cellStyle: {
        minWidth: 80
      }
    },
    {
      title: t('displayPosition'),
      field: 'display_position',
      cellStyle: { minWidth: 70 }
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    }
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={categories.map((i, index) => ({
          ...i,
          index: index + 1,
          child_categories:
            i.child_categories && i.child_categories.length > 0
              ? i.child_categories.map(i => i.title).join(', ')
              : '',
          typeName: CATEGORY_TYPE_MAP[i.type]
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/categories/create')
          },
          // {
          //   icon: 'filter_list',
          //   tooltip: 'Add User',
          //   isFreeAction: true,
          //   onClick: () => alert('You want to add a new row')
          // },
          {
            icon: 'edit',
            iconProps: { color: 'primary' },
            tooltip: t('update'),
            onClick: (e, rowData) =>
              history.push(`/admin/categories/update?id=${rowData._id}`),
            position: 'row'
          },
          rowData =>
            rowData.type < 0
              ? {
                  icon: 'delete',
                  iconProps: { color: 'secondary' },
                  tooltip: t('delete'),
                  onClick: (e, rowData) => {
                    props.setAlert({
                      content: 'Bạn chắc chắn muốn xoá?',
                      buttons: [
                        {
                          text: t('cancel'),
                          toggleAfterPressed: true,
                          color: 'default'
                        },
                        {
                          text: t('submit'),
                          toggleAfterPressed: true,
                          color: 'secondary',
                          onPress: () =>
                            props.deleteCategory({
                              api: api.deleteCategory,
                              params: { _id: rowData._id }
                            })
                        }
                      ]
                    });
                  },
                  position: 'row'
                }
              : null
        ]}
        isLoading={isLoading}
        {...tableConstants}
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  categories: category.selectors.items,

  isLoading: createSelector(
    category.selectors.isLoadingItems,
    category.selectors.isUpdating,
    category.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getCategories: category.actions.categoryGetAllAjax,

  updateCategory: category.actions.categoryUpdateAjax,

  deleteCategory: category.actions.categoryDeleteAjax,

  cancel: category.actions.categoryGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Categories);
