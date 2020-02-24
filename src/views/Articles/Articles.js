import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { article, app } from 'reducers';

import { tableConstants } from 'utils/table';
import { CATEGORY_TYPE } from '../../constants';
import { formatDateTime } from 'utils/format';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { formatStr } from 'utils/format';
import Handle from 'components/Handle/index';
import { client } from '../../services/client';
import { accountClient } from '../../services/accountClient';

function Articles(props) {
  // eslint-disable-next-line react/prop-types
  const { t, articles, isLoading, history } = props;

  const getList = () => {
    props.getArticles({
      countApi: api.countArticles,
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.OTHERS
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
      title: 'Hình ảnh',
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
      title: 'Loại',
      field: 'thumbnail_video',
      render: rowData => {
        if (!rowData.thumbnail_video) return 'Bài đăng';
        return 'Video';
      }
    },
    {
      title: 'Kiểu tin',
      field: 'international_type',
      lookup: { 1: 'Tin trong nước', 0: 'Tin nước ngoài' }
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
    // {
    //   title: t('category'),
    //   field: 'category',
    //   cellStyle: {
    //     minWidth: 70
    //   }
    // },
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
      title: t('createdAt'),
      field: 'created_at'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('instant_post'), 2: t('draft'), 3: t('inactive') }
    },
    {
      title: 'Đăng trên App',
      field: 'is_published',
      lookup: { 1: 'Có' },
      cellStyle: {
        textAlign: 'center'
      }
    }
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={articles.map(i => ({
          ...i,
          category: i.category ? i.category.title : '',
          created_at: formatDateTime(i.created_at)
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push(`/admin/articles/create`)
          },
          // {
          //   icon: 'filter_list',
          //   tooltip: 'Add User',
          //   isFreeAction: true,
          //   onClick: () => alert('You want to add a new row')
          // },
          rowData =>
            rowData.is_published == 1
              ? {
                  icon: 'remove_circle',
                  iconProps: { color: 'secondary' },
                  tooltip: 'Gỡ khỏi App',
                  onClick: (e, rowData) =>
                    props.setAlert({
                      content: 'Bạn chắc chắn muốn gỡ khỏi App?',
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
                          onPress: () => {
                            unPublic(rowData);
                          }
                        }
                      ]
                    })
                }
              : null,
          {
            icon: 'edit',
            iconProps: { color: 'primary' },
            tooltip: t('update'),
            onClick: (e, rowData) =>
              history.push(`/admin/articles/update?id=${rowData._id}`),
            position: 'row'
          },
          rowData =>
            rowData.is_published != 1
              ? {
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
              : null
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
  articles: article.selectors.items,

  isLoading: createSelector(
    article.selectors.isLoadingItems,
    article.selectors.isUpdating,
    article.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getArticles: article.actions.articleGetAllAjax,

  updateArticle: article.actions.articleUpdateAjax,

  deleteArticle: article.actions.articleDeleteAjax,

  cancel: article.actions.articleGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Articles);
