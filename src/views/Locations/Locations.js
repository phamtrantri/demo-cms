import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { location, app } from 'reducers';
// import { formatDate } from 'utils/format';
import { tableConstants } from 'utils/table';

function Locations(props) {
  // eslint-disable-next-line react/prop-types
  const { t, locations, isLoading, history } = props;

  useEffect(() => {
    props.getLocations({
      countApi: api.countLocations,
      api: api.getLocations,
      params: { page: 1, pageSize: 200, status: '' }
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
    { title: t('areaName'), field: 'area_name' },
    { title: t('buildingName'), field: 'building_name' },
    { title: t('floorName'), field: 'floor_name' },
    { title: t('description'), field: 'description' },
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
        data={locations.map((i, index) => ({
          ...i,
          index: index + 1,
          area_name: i.contents.length > 0 ? i.contents[0].area_name : '',
          building_name: i.contents.length > 0 ? i.contents[0].building_name : '',
          floor_name: i.contents.length > 0 ? i.contents[0].floor_name : '',
          description: i.contents.length > 0 ? i.contents[0].description : '',
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/locations/create')
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
              history.push(`/admin/locations/update?id=${rowData._id}`),
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
                      props.deleteLocation({
                        api: api.deleteLocation,
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
  locations: location.selectors.items,

  isLoading: createSelector(
    location.selectors.isLoadingItems,
    location.selectors.isUpdating,
    location.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getLocations: location.actions.locationGetAllAjax,

  updateLocation: location.actions.locationUpdateAjax,

  deleteLocation: location.actions.locationDeleteAjax,

  cancel: location.actions.locationGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Locations);
