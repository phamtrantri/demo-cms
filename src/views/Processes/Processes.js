import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { articleProcess, app } from 'reducers';

import { formatStr } from 'utils/format';
import { tableConstants } from 'utils/table';
import { CATEGORY_TYPE } from '../../constants';

function Processes(props) {
  // eslint-disable-next-line react/prop-types
  const { t, articles, isLoading, history } = props;

  useEffect(() => {
    props.getArticles({
      countApi: api.countArticles,
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.QUY_TRINH
      }
    });
    return () => {
      props.cancel();
    };
  }, []);

  const columns = [
    {
      title: t('stt'),
      field: 'stt',
      render: rowData => rowData.tableData.id + 1
    },
    {
      title: t('language'),
      field: 'language'
    },
    {
      title: t('thumbnailImage'),
      field: 'thumbnail_image',
      render: rowData => {
        if (!rowData.thumbnail_image) return '';
        return (
          <img
            src={rowData.thumbnail_image}
            style={{ width: 80 }}
            alt={t('thumbnail')}
          />
        );
      }
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
      title: t('description'),
      field: 'description',
      render: rowData => {
        const str = rowData.description;
        return formatStr(str, 200);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('displayPosition'),
      field: 'display_position',
      cellStyle: { minWidth: 70 }
    },
    {
      title: t('creator'),
      field: 'created_by'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('instant_post'), 2: t('draft'), 3: t('inactive') }
    }
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={articles}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/quy-trinh/create')
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
              history.push(`/admin/quy-trinh/update?id=${rowData._id}`),
            position: 'row'
          },
          {
            icon: 'delete',
            iconProps: { color: 'secondary' },
            tooltip: t('delete'),
            onClick: (e, rowData) =>
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
                      props.deleteArticle({
                        api: api.deleteArticle,
                        params: { _id: rowData._id }
                      })
                  }
                ]
              }),
            position: 'row'
          }
        ]}
        isLoading={isLoading}
        {...tableConstants}
        options={{
          ...tableConstants.options,
          exportButton: false
        }}
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  articles: articleProcess.selectors.items,

  isLoading: createSelector(
    articleProcess.selectors.isLoadingItems,
    articleProcess.selectors.isUpdating,
    articleProcess.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getArticles: articleProcess.actions.articleProcessGetAllAjax,

  updateArticle: articleProcess.actions.articleProcessUpdateAjax,

  deleteArticle: articleProcess.actions.articleProcessDeleteAjax,

  cancel: articleProcess.actions.articleProcessGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Processes);
