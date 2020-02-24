import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { doctorService, app } from 'reducers';
import { api } from 'services';

import { tableConstants } from 'utils/table';

function DoctorServices(props) {
  // eslint-disable-next-line react/prop-types
  const { t, doctorServices, isLoading, history } = props;

  useEffect(() => {
    props.getDoctorServices({
      countApi: api.countDoctorServices,
      api: api.getDoctorServices,
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
      title: t('doctor'),
      field: 'doctor'
    },
    {
      title: t('service'),
      field: 'service'
    },
    {
      title: t('displayPosition'),
      field: 'display_position'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    },
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={doctorServices.map((i, index) => ({
          ...i,
          index: index + 1,
          doctor:
            i.doctor && i.doctor.contents && i.doctor.contents.length > 0
              ? i.doctor.contents[0].fullname
              : '',
          service:
            i.service && i.service.contents && i.service.contents.length > 0
              ? i.service.contents[0].title
              : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/doctor-services/create')
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
              history.push(`/admin/doctor-services/update?id=${rowData._id}`),
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
                      props.deleteDoctorService({
                        api: api.deleteDoctorService,
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
  doctorServices: doctorService.selectors.items,

  isLoading: createSelector(
    doctorService.selectors.isLoadingItems,
    doctorService.selectors.isUpdating,
    doctorService.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getDoctorServices: doctorService.actions.doctorServiceGetAllAjax,

  updateDoctorService: doctorService.actions.doctorServiceUpdateAjax,

  deleteDoctorService: doctorService.actions.doctorServiceDeleteAjax,

  cancel: doctorService.actions.doctorServiceGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(DoctorServices);
