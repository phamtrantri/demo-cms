import React, { useEffect, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import { api } from 'services';
import { servicePrice, app, service, servicePriceType, doctor } from 'reducers';
import { tableConstants } from 'utils/table';
import {
  formatDateTime,
  formatDate,
  formatTime,
  formatCurrency
} from 'utils/format';
import CustomAlert from 'components/CustomAlert/CustomAlert';

import Filter from './components/Filter';

function ServicePrices(props) {
  // eslint-disable-next-line react/prop-types
  const {
    t,
    servicePrices,
    isLoading,
    history,
    services,
    servicePriceTypes,
    doctors
  } = props;
  const [open, setOpen] = useState(false);

  const getList = str => {
    props.getServicePrices({
      countApi: api.countServicePrices,
      api: api.getServicePrices,
      params: {
        page: 1,
        pageSize: 200,
        status: 1,
        customUrl: str
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFromToHour = i => {
    let from_to_hour =
      formatTime(i.from_applied_hour) + ' - ' + formatTime(i.to_applied_hour);
    return from_to_hour != ' - ' ? from_to_hour : '';
  };

  useEffect(() => {
    props.getServicePrices({
      countApi: api.countServicePrices,
      api: api.getServicePrices,
      params: { page: 1, pageSize: 200, status: 1 }
    });

    props.getServices({
      countApi: api.countServices,
      api: api.getServices,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getServicePriceTypes({
      countApi: api.countServicePriceTypes,
      api: api.getServicePriceTypes,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getDoctors({
      countApi: api.countDoctors,
      api: api.getDoctors,
      params: { page: 1, pageSize: 200, status: 1 }
    });

    return () => {
      props.cancel();
    };
  }, []);

  const theme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          padding: '14px 30px 14px 16px'
        }
      }
    }
  });

  const columns = [
    {
      title: t('stt'),
      field: 'index'
    },
    {
      title: t('service'),
      field: 'service',
      emptyValue: '-'
    },
    {
      title: t('servicePriceType'),
      field: 'type',
      emptyValue: '-'
    },
    {
      title: t('doctor'),
      field: 'doctor'
    },
    // { title: t('price'), field: 'value', type: 'numeric' },
    {
      title: t('price'),
      field: 'text_price',
      cellStyle: {
        textAlign: 'right'
      }
    },
    {
      title: 'Thời gian',
      field: 'from_to_hour',
      cellStyle: {
        minWidth: 100
      }
    },
    // {
    //   title: 'Ngày bắt đầu',
    //   field: 'from_date',
    //   cellStyle: {
    //     minWidth: 110
    //   }
    // },
    // {
    //   title: 'Ngày kết thúc',
    //   field: 'end_date',
    //   cellStyle: {
    //     minWidth: 110
    //   }
    // },
    {
      title: t('startDate'),
      field: 'start_date',
      emptyValue: '-'
    },
    {
      title: t('endDate'),
      field: 'end_date',
      emptyValue: '-'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    }
  ];

  return (
    <Suspense>
      <Filter
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        getList={getList}
        dataInit={{
          services: services,
          servicePriceTypes: servicePriceTypes,
          doctors: doctors
        }}
      />

      <MuiThemeProvider theme={theme}>
        <MaterialTable
          columns={columns}
          data={servicePrices.map((i, index) => ({
            ...i,
            index: index + 1,
            service:
              i.service && i.service.contents && i.service.contents[0]
                ? i.service.contents[0].title
                : '',
            doctor:
              i.doctor && i.doctor.contents && i.doctor.contents[0]
                ? i.doctor.contents[0].fullname
                : '',
            type:
              i.type && i.type.contents && i.type.contents[0]
                ? i.type.contents[0].description
                : '',

            from_to_hour: getFromToHour(i),
            start_date: formatDate(i.start_date),
            end_date: formatDate(i.end_date),
            text_price: formatCurrency(i.value, i.unit, '0 VND')

            // start_date: formatDateTime(i.start_date),
            // end_date: formatDateTime(i.end_date)
          }))}
          actions={[
            {
              icon: 'add',
              tooltip: t('add'),
              isFreeAction: true,
              onClick: () => history.push('/admin/service-prices/create')
            },
            {
              icon: 'filter_list',
              tooltip: 'Lọc dữ liệu',
              isFreeAction: true,
              onClick: handleClickOpen
            },
            {
              icon: 'edit',
              iconProps: { color: 'primary' },
              tooltip: t('update'),
              onClick: (e, rowData) =>
                history.push(`/admin/service-prices/update?id=${rowData._id}`),
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
                        props.deleteServicePrice({
                          api: api.deleteServicePrice,
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
      </MuiThemeProvider>

      <CustomAlert />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  services: service.selectors.items,
  servicePriceTypes: servicePriceType.selectors.items,
  doctors: doctor.selectors.items,

  servicePrices: servicePrice.selectors.items,
  isLoading: createSelector(
    servicePrice.selectors.isLoadingItems,
    servicePrice.selectors.isUpdating,
    servicePrice.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getServices: service.actions.serviceGetAllAjax,
  getServicePriceTypes: servicePriceType.actions.servicePriceTypeGetAllAjax,
  getDoctors: doctor.actions.doctorGetAllAjax,

  getServicePrices: servicePrice.actions.servicePriceGetAllAjax,
  updateServicePrice: servicePrice.actions.servicePriceUpdateAjax,

  deleteServicePrice: servicePrice.actions.servicePriceDeleteAjax,

  cancel: servicePrice.actions.servicePriceGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(ServicePrices);
