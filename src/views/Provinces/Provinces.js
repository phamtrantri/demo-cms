import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import { api } from 'services';
import { province, app } from 'reducers';
import { tableConstants } from 'utils/table';
import { formatDateTime } from 'utils/format';
import CustomAlert from 'components/CustomAlert/CustomAlert';

function Provinces(props) {
  // eslint-disable-next-line react/prop-types
  const { t, provinces, isLoading, history } = props;

  useEffect(() => {
    props.getProvinces({
      countApi: api.countProvinces,
      api: api.getProvincesWithPaging,
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
      title: t('country_id'),
      field: 'country_id',
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
          data={provinces.map((i, index) => ({
            ...i,
            index: index + 1,
            name: i.contents && i.contents.length > 0 ? i.contents[0].name : '',
            
          }))}
          actions={[
            {
              icon: 'add',
              tooltip: t('add'),
              isFreeAction: true,
              onClick: () => history.push('/admin/provinces/create')
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
                history.push(`/admin/provinces/update?id=${rowData._id}`),
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
                        props.deleteProvince({
                          api: api.deleteProvince,
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
  provinces: province.selectors.items,

  isLoading: createSelector(
    province.selectors.isLoadingItems,
    province.selectors.isUpdating,
    province.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getProvinces: province.actions.provinceGetAllAjax,

  updateProvince: province.actions.provinceUpdateAjax,

  deleteProvince: province.actions.provinceDeleteAjax,

  cancel: province.actions.provinceGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Provinces);
