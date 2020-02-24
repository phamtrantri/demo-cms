import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { articleMenu, app } from 'reducers';

// import { formatStr } from 'utils/format';
import { tableConstants } from 'utils/table';
import { CATEGORY_TYPE } from '../../constants';
import Handle from 'components/Handle/index';
import { client } from '../../services/client';
import { accountClient } from '../../services/accountClient';

function MenuArticles(props) {
  // eslint-disable-next-line react/prop-types
  const { t, articles, isLoading, history } = props;

  const getList = () => {
    props.getArticles({
      countApi: api.countArticles,
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.MENU
      }
    });
  };

  useEffect(() => {
    getList();
    return () => {
      props.cancel();
    };
  }, []);

  const showSuccess = () => {
    props.setAlert({
      content: 'Bạn đã gỡ khỏi App thành công',
      buttons: [
        {
          text: t('close'),
          toggleAfterPressed: true,
          color: 'default'
        }
      ]
    });
  };

  const unPublicInGeneral = data => {
    return accountClient.delete(`/v1/article?ref_code=${data._id}`);
  };
  const unPublicInHospital = data => {
    return client.put(`/articles/${data._id}/publication-status`, {
      is_published: 0
    });
  };

  const unPublic = data => {
    unPublicInGeneral(data).then(res => {
      if (res.success === true) {
        unPublicInHospital(data).then(res => {
          if (res.success === true) {
            showSuccess();
            getList();
          }
        });
      }
    });
  };

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
        return <Handle handle={rowData.handle}></Handle>;
      }
    },
    {
      title: t('category'),
      field: 'category.title'
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
    // {
    //   title: 'Đăng trên App',
    //   field: 'is_published',
    //   lookup: { 1: 'Có' },
    //   cellStyle: {
    //     textAlign: 'center'
    //   }
    // }
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
            onClick: () => history.push(`/admin/links/create`)
          },
          // {
          //   icon: 'filter_list',
          //   tooltip: 'Add User',
          //   isFreeAction: true,
          //   onClick: () => alert('You want to add a new row')
          // },
          // rowData =>
          //   rowData.is_published == 1
          //     ? {
          //         icon: 'remove_circle',
          //         iconProps: { color: 'secondary' },
          //         tooltip: 'Gỡ khỏi App',
          //         onClick: (e, rowData) =>
          //           props.setAlert({
          //             content: 'Bạn chắc chắn muốn gỡ khỏi App?',
          //             buttons: [
          //               {
          //                 text: t('cancel'),
          //                 toggleAfterPressed: true,
          //                 color: 'default'
          //               },
          //               {
          //                 text: t('submit'),
          //                 toggleAfterPressed: true,
          //                 color: 'secondary',
          //                 onPress: () => {
          //                   unPublic(rowData);
          //                 }
          //               }
          //             ]
          //           })
          //       }
          //     : null,
          {
            icon: 'edit',
            iconProps: { color: 'primary' },
            tooltip: t('update'),
            onClick: (e, rowData) =>
              history.push(`/admin/links/update?id=${rowData._id}`),
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
  articles: articleMenu.selectors.items,

  isLoading: createSelector(
    articleMenu.selectors.isLoadingItems,
    articleMenu.selectors.isUpdating,
    articleMenu.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getArticles: articleMenu.actions.articleMenuGetAllAjax,

  updateArticle: articleMenu.actions.articleMenuUpdateAjax,

  deleteArticle: articleMenu.actions.articleMenuDeleteAjax,

  cancel: articleMenu.actions.articleMenuGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(MenuArticles);
