import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { articleIntro, app } from 'reducers';

import { formatStr } from 'utils/format';
import { tableConstants } from 'utils/table';
import { CATEGORY_TYPE } from '../../constants';
import { formatDateTime } from 'utils/format';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { client } from '../../services/client';
import { accountClient } from '../../services/accountClient';

function Introductions(props) {
  // eslint-disable-next-line react/prop-types
  const { t, articles, isLoading, history } = props;

  const getList = () => {
    props.getArticles({
      countApi: api.countArticles,
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.INTRO
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
      field: 'title'
    },
    {
      title: t('handle'),
      field: 'handle',
      render: rowData => {
        return (
          <>
            <div className="tooltip">
              <CopyToClipboard text={rowData.handle}>
                <span>{formatStr(rowData.handle, 20)}</span>
              </CopyToClipboard>
              <span className="tooltip-text">{rowData.handle}</span>
            </div>
          </>
        );
      }
    },
    {
      title: t('description'),
      field: 'description',
      render: rowData => {
        const str = rowData.description;
        return formatStr(str, 120);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('updatedAt'),
      field: 'updated_at',
      render: rowData => formatDateTime(rowData.updated_at)
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
            onClick: () => history.push('/admin/pages/create')
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
              history.push(`/admin/pages/update?id=${rowData._id}`),
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
  articles: articleIntro.selectors.items,

  isLoading: createSelector(
    articleIntro.selectors.isLoadingItems,
    articleIntro.selectors.isUpdating,
    articleIntro.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getArticles: articleIntro.actions.articleIntroGetAllAjax,

  updateArticle: articleIntro.actions.articleIntroUpdateAjax,

  deleteArticle: articleIntro.actions.articleIntroDeleteAjax,

  cancel: articleIntro.actions.articleIntroGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Introductions);
