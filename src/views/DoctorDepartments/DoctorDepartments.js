import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { doctorDepartment, app } from 'reducers';
import { api } from 'services';

import { tableConstants } from 'utils/table';

function DoctorDepartments(props) {
  // eslint-disable-next-line react/prop-types
  const { t, doctorDepartments, isLoading, history } = props;

  useEffect(() => {
    props.getDoctorDepartments({
      countApi: api.countDoctorDepartments,
      api: api.getDoctorDepartments,
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
      title: t('department'),
      field: 'department'
    },
    {
      title: 'Vị trí công tác',
      field: 'position'
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
        data={doctorDepartments.map((i, index) => ({
          ...i,
          index: index + 1,
          doctor:
            i.doctor && i.doctor.contents && i.doctor.contents.length > 0
              ? i.doctor.contents[0].fullname
              : '',
          department:
            i.department &&
            i.department.contents &&
            i.department.contents.length > 0
              ? i.department.contents[0].title
              : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/doctor-departments/create')
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
              history.push(
                `/admin/doctor-departments/update?id=${rowData._id}`
              ),
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
                      props.deleteDoctorDepartment({
                        api: api.deleteDoctorDepartment,
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
  doctorDepartments: doctorDepartment.selectors.items,

  isLoading: createSelector(
    doctorDepartment.selectors.isLoadingItems,
    doctorDepartment.selectors.isUpdating,
    doctorDepartment.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getDoctorDepartments: doctorDepartment.actions.doctorDepartmentGetAllAjax,

  updateDoctorDepartment: doctorDepartment.actions.doctorDepartmentUpdateAjax,

  deleteDoctorDepartment: doctorDepartment.actions.doctorDepartmentDeleteAjax,

  cancel: doctorDepartment.actions.doctorDepartmentGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(DoctorDepartments);
