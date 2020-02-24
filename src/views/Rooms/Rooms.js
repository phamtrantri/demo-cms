import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { room, app } from 'reducers';
// import { formatDate } from 'utils/format';
import { tableConstants } from 'utils/table';

function Rooms(props) {
  // eslint-disable-next-line react/prop-types
  const { t, rooms, isLoading, history } = props;

  useEffect(() => {
    props.getRooms({
      countApi: api.countRooms,
      api: api.getRooms,
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
    { title: t('roomNumber'), field: 'room_number' },
    { title: t('description'), field: 'description' },
    { title: t('department'), field: 'department' },
    { title: t('location'), field: 'location' },
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
        data={rooms.map((i, index) => ({
          ...i,
          index: index + 1,
          room_number: i.contents.length ? i.contents[0].room_number : '',
          description: i.contents.length ? i.contents[0].description : '',
          department:
            i.department.contents.length > 0
              ? i.department.contents[0].title
              : '',
          location: i.location ? i.location.contents[0].area_name : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/rooms/create')
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
              history.push(`/admin/rooms/update?id=${rowData._id}`),
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
                      props.deleteRoom({
                        api: api.deleteRoom,
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
  rooms: room.selectors.items,

  isLoading: createSelector(
    room.selectors.isLoadingItems,
    room.selectors.isUpdating,
    room.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getRooms: room.actions.roomGetAllAjax,

  updateRoom: room.actions.roomUpdateAjax,

  deleteRoom: room.actions.roomDeleteAjax,

  cancel: room.actions.roomGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Rooms);
