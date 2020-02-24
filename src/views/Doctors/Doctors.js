import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { doctor, app } from 'reducers';
import { formatDate } from 'utils/format';
import { tableConstants } from 'utils/table';
import Handle from 'components/Handle/index';

function Doctors(props) {
  // eslint-disable-next-line react/prop-types
  const { t, doctors, isLoading, history } = props;

  useEffect(() => {
    props.getDoctors({
      countApi: api.countDoctors,
      api: api.getDoctors,
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
    { title: t('code'), field: 'code' },
    {
      title: t('logo'),
      field: 'logo',
      render: rowData => {
        if (!rowData.avatar) return '';
        return (
          <img
            src={rowData.avatar}
            style={{ width: 80 }}
            alt={t('logo')}
          />
        );
      }
    },
    { title: t('fullname'), field: 'fullname' },
    // {
    //   title: t('handle'),
    //   field: 'handle',
    //   render: rowData => {
    //     return (
    //       <Handle handle={rowData.handle}></Handle>
    //     );
    //   }
    // },
    { title: t('eduTitle'), field: 'edu_title' },
    {
      title: t('gender'),
      field: 'gender',
      lookup: { 1: t('male'), 2: t('female') }
    },
    {
      title: t('birthdate'),
      field: 'birthdate',
      emptyValue: '-'
    },
    { title: t('profile'), field: 'CV_url' },
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
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={doctors.map((i, index) => ({
          ...i,
          index: index + 1,
          birthdate: formatDate(i.birthdate),
          fullname: i.contents.length > 0 ? i.contents[0].fullname : '',
          handle: i.contents.length > 0 ? i.contents[0].handle : '',
          edu_title: i.contents.length > 0 ? i.contents[0].edu_title : '',
          major: i.contents.length > 0 ? i.contents[0].major : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/doctors/create')
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
              history.push(`/admin/doctors/update?id=${rowData._id}`),
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
                      props.deleteDoctor({
                        api: api.deleteDoctor,
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
  doctors: doctor.selectors.items,

  isLoading: createSelector(
    doctor.selectors.isLoadingItems,
    doctor.selectors.isUpdating,
    doctor.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getDoctors: doctor.actions.doctorGetAllAjax,

  updateDoctor: doctor.actions.doctorUpdateAjax,

  deleteDoctor: doctor.actions.doctorDeleteAjax,

  cancel: doctor.actions.doctorGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Doctors);
