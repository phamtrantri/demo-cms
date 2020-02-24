import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { photo, app } from 'reducers';
import { formatDate } from 'utils/format';
import { tableConstants } from 'utils/table';
import Handle from 'components/Handle';

function Photo(props) {
  // eslint-disable-next-line react/prop-types
  const { t, photos, isLoading, history } = props;

  useEffect(() => {
    props.getPhotos({
      countApi: api.countPhotos,
      api: api.getPhotos,
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
      title: t('image'),
      field: 'image_url',
      render: rowData => {
        if (!rowData.image_url) return '';
        return (
          <img src={rowData.image_url} style={{ width: 80 }} alt={t('image')} />
        );
      }
    },
    {
      title: t('title'),
      field: 'text_title'
    },
    {
      title: t('department'),
      field: 'text_department'
    },
    {
      title: t('service'),
      field: 'text_service'
    },
    // {
    //   title: t('doctor'),
    //   field: 'text_doctor'
    // },
    // {
    //   title: t('article'),
    //   field: 'text_article'
    // },
    {
      title: t('displayPosition'),
      field: 'display_position',
      cellStyle: {
        minWidth: 70
      }
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
        data={photos.map((i, index) => ({
          ...i,
          index: index + 1,
          text_title: i.contents.length ? i.contents[0].title : '',
          text_department: i.department ? i.department.contents[0].title : '',
          text_service: i.service ? i.service.contents[0].title : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/photos/create')
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
              history.push(`/admin/photos/update?id=${rowData._id}`),
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
                      props.deletePhoto({
                        api: api.deletePhoto,
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
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  photos: photo.selectors.items,

  isLoading: createSelector(
    photo.selectors.isLoadingItems,
    photo.selectors.isUpdating,
    photo.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getPhotos: photo.actions.photoGetAllAjax,

  updatePhoto: photo.actions.photoUpdateAjax,

  deletePhoto: photo.actions.photoDeleteAjax,

  cancel: photo.actions.photoGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Photo);
