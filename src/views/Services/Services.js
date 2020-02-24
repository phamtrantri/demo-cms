import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { service, app } from 'reducers';
import { tableConstants } from 'utils/table';
import Handle from 'components/Handle/index';

import { formatCurrency } from 'utils/format';
import { client } from '../../services/client';
import { accountClient } from '../../services/accountClient';

function Services(props) {
  // eslint-disable-next-line react/prop-types
  const { t, services, isLoading, history } = props;

  const getList = () => {
    props.getServices({
      countApi: api.countServices,
      api: api.getServices,
      params: { page: 1, pageSize: 200 }
    });
  };

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

  useEffect(() => {
    getList();
    return () => {
      props.cancel();
    };
  }, []);

  const unPublicInGeneral = data => {
    return accountClient.delete(`/v1/service?ref_code=${data._id}`);
  };
  const unPublicInHospital = data => {
    return client.put(`/services/${data._id}/publication-status`, {
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
      field: 'index'
    },
    { title: t('code'), field: 'code' },
    {
      title: t('logo'),
      field: 'logo',
      render: rowData => {
        if (!rowData.logo) return '';
        return <img src={rowData.logo} style={{ width: 80 }} alt={t('logo')} />;
      }
    },
    {
      title: t('title'),
      field: 'title',
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: 200
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
      title: t('type'),
      field: 'type',
      lookup: {
        1: 'Dùng để giới thiệu',
        2: 'Dùng để bán',
        3: 'Dùng để giới thiệu và bán'
      }
    },
    {
      title: t('basic_price'),
      field: 'basic_price',
      cellStyle: {
        textAlign: 'right'
      }
    },
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
        data={services.map((i, index) => ({
          ...i,
          index: index + 1,
          title: i.contents.length > 0 ? i.contents[0].title : '',
          handle: i.contents.length > 0 ? i.contents[0].handle : '',
          description: i.contents.length > 0 ? i.contents[0].description : '',
          basic_price: i.basic_price
            ? formatCurrency(i.basic_price.value, 'VND', '0 VND')
            : ''
        }))}
        // data={async query => {
        //   try {
        //     const res = await api.getServices({
        //       page: query.page + 1,
        //       pageSize: 10,
        //       status: 1
        //     });
        //     return await {
        //       data: res.payload.data,
        //       page: query.page,
        //       totalCount: res.payload.total
        //     };
        //   } catch (error) {}
        // }}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/services/create')
          },
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
              history.push(`/admin/services/update?id=${rowData._id}`),
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
                            props.deleteService({
                              api: api.deleteService,
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
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  services: service.selectors.items,

  isLoading: createSelector(
    service.selectors.isLoadingItems,
    service.selectors.isUpdating,
    service.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getServices: service.actions.serviceGetAllAjax,

  updateService: service.actions.serviceUpdateAjax,

  deleteService: service.actions.serviceDeleteAjax,

  cancel: service.actions.serviceGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Services);
