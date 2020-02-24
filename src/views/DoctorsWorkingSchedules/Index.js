import React, { useEffect, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api, workingSchedule as apiWorkingSchedule } from 'services';
import {
  doctor,
  workingSchedule,
  app,
  service,
  room,
  location
} from 'reducers';
import { formatDate, formatTime } from 'utils/format';
import { tableConstants } from 'utils/table';

import Filter from './components/Filter';

function WorkingSchedules(props) {
  // eslint-disable-next-line react/prop-types
  const {
    t,
    workingSchedules,
    isLoading,
    history,
    services,
    doctors,
    rooms,
    locations
  } = props;

  const [open, setOpen] = useState(false);

  const getList = str => {
    props.getWorkingSchedules({
      countApi: apiWorkingSchedule.countWorkingSchedules,
      api: apiWorkingSchedule.getWorkingSchedules,
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

  useEffect(() => {
    props.getWorkingSchedules({
      countApi: apiWorkingSchedule.countWorkingSchedules,
      api: apiWorkingSchedule.getWorkingSchedules,
      params: { page: 1, pageSize: 200, status: 1 }
    });

    props.getServices({
      countApi: api.countServices,
      api: api.getServices,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getDoctors({
      countApi: api.countDoctors,
      api: api.getDoctors,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getRooms({
      countApi: api.countRooms,
      api: api.getRooms,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getLocations({
      countApi: api.countLocations,
      api: api.getLocations,
      params: { page: 1, pageSize: 200, status: 1 }
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
      field: 'doctor',
      cellStyle: {
        minWidth: 150
      }
    },
    { title: 'Thứ', field: 'day_of_week' },
    {
      title: 'Thời gian',
      field: 'from_to_hour',
      cellStyle: {
        minWidth: 100
      }
    },
    {
      title: 'Ngày bắt đầu',
      field: 'from_date',
      cellStyle: {
        minWidth: 110
      }
    },
    {
      title: 'Ngày kết thúc',
      field: 'end_date',
      cellStyle: {
        minWidth: 110
      }
    },

    {
      title: t('service'),
      field: 'service',
      cellStyle: {
        minWidth: 100
      }
    },
    {
      title: t('department'),
      field: 'department',
      cellStyle: {
        minWidth: 100
      }
    },
    {
      title: t('quota'),
      field: 'quota',
      cellStyle: {
        minWidth: 100
      }
    },
    { title: 'Phòng', field: 'room' },
    { title: 'Địa chỉ', field: 'location' },
    { title: t('description'), field: 'description' },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    }
  ];

  const getFromToHour = i => {
    let from_to_hour = formatTime(i.from_hour) + ' - ' + formatTime(i.end_hour);
    return from_to_hour;
  };

  return (
    <Suspense>
      <Filter
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        getList={getList}
        dataInit={{
          services: services,
          doctors: doctors,
          rooms: rooms,
          locations: locations
        }}
      />

      <MaterialTable
        columns={columns}
        data={workingSchedules.map((i, index) => ({
          ...i,
          index: index + 1,

          department:
            i.department.contents.length > 0
              ? i.department.contents[0].title
              : '',
          service:
            i.service.contents.length > 0 ? i.service.contents[0].title : '',
          doctor:
            i.doctor.contents.length > 0 ? i.doctor.contents[0].fullname : '',
          day_of_week:
            i.day_of_week === 8 ? 'Chủ nhật' : 'Thứ ' + i.day_of_week,
          from_to_hour: getFromToHour(i),
          from_date: formatDate(i.from_date),
          end_date: formatDate(i.end_date),
          room: i.room ? i.room.contents[0].room_number : '',
          location: i.location
            ? `${i.location.contents[0].area_name} - ${i.location.contents[0].floor_name} - ${i.location.contents[0].building_name}`
            : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () =>
              history.push('/admin/doctor-working-schedules/create')
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
              history.push(
                `/admin/doctor-working-schedules/update?id=${rowData._id}`
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
                      props.deleteWorkingSchedule({
                        api: apiWorkingSchedule.deleteWorkingSchedule,
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
  services: service.selectors.items,
  doctors: doctor.selectors.items,
  rooms: room.selectors.items,
  locations: location.selectors.items,

  workingSchedules: workingSchedule.selectors.items,

  isLoading: createSelector(
    workingSchedule.selectors.isLoadingItems,
    workingSchedule.selectors.isUpdating,
    workingSchedule.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getServices: service.actions.serviceGetAllAjax,
  getDoctors: doctor.actions.doctorGetAllAjax,
  getRooms: room.actions.roomGetAllAjax,
  getLocations: location.actions.locationGetAllAjax,

  getWorkingSchedules: workingSchedule.actions.workingScheduleGetAllAjax,

  updateWorkingSchedule: workingSchedule.actions.workingScheduleUpdateAjax,

  deleteWorkingSchedule: workingSchedule.actions.workingScheduleDeleteAjax,

  cancel: workingSchedule.actions.workingScheduleGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(WorkingSchedules);
