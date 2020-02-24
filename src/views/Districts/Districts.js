import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import { api } from 'services';
import { district, app } from 'reducers';
import { tableConstants } from 'utils/table';
import { formatDateTime } from 'utils/format';
import CustomAlert from 'components/CustomAlert/CustomAlert';

function Districts(props) {
  // eslint-disable-next-line react/prop-types
  const { t, districts, isLoading, history } = props;

  useEffect(() => {
    props.getDistricts({
      countApi: api.countDistricts,
      api: api.getDistrictsWithPaging,
      params: { page: 1, pageSize: 200 }
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
      title: t('id'),
      field: 'id',
      emptyValue: '-'
    },
    {
      title: t('name'),
      field: 'name',
      emptyValue: '-'
    },
    {
      title: t('province_id'),
      field: 'province_id',
      emptyValue: '-'
    },
    {
      title: t('displayPosition'),
      field: 'display_position',
      emptyValue: '-'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    },
  ];

  return (
    <Suspense>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          columns={columns}
          data={districts.map((i, index) => ({
            ...i,
            index: index + 1,
            name: i.contents && i.contents.length > 0 ? i.contents[0].name : '',
            
          }))}
          actions={[
            {
              icon: 'add',
              tooltip: t('add'),
              isFreeAction: true,
              onClick: () => history.push('/admin/districts/create')
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
                history.push(`/admin/districts/update?id=${rowData._id}`),
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
                        props.deleteDistrict({
                          api: api.deleteDistrict,
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
  districts: district.selectors.items,

  isLoading: createSelector(
    district.selectors.isLoadingItems,
    district.selectors.isUpdating,
    district.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getDistricts: district.actions.districtGetAllAjax,

  updateDistrict: district.actions.districtUpdateAjax,

  deleteDistrict: district.actions.districtDeleteAjax,

  cancel: district.actions.districtGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Districts);
