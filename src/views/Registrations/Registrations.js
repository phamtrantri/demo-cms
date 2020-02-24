import React, { useEffect, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { registration, app } from 'reducers';

import { tableConstants } from 'utils/table';
import { formatDateTime, formatDate, formatTime } from 'utils/format';
import { REGISTRATION_STATUS, REGISTRATION_IS_VERIFIED } from 'constants/index';

import FilterSelect from 'components/CustomFilter/Select';
import { REGISTRATION_T_STATUS } from '../../constants/index';

import Filter from './components/Filter';
import Search from './components/Search';
import Detail from './components/Detail';

import moment from 'moment';
import axios from 'axios';
import configs from '../../configs';
import { getItem } from 'utils/storage';
import { client } from '../../services/client';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import FilterDate from 'components/CustomFilter/Date';
import { convertStrParams } from '../../utils/convert';
import { formatCurrency } from 'utils/format';

import Box from '@material-ui/core/Box';
import { set } from 'ramda';

let page_size = 10;
let default_params = {
  page: 1,
  pageSize: 200,
  status: '-1',
  doctor_fullname: '',
  from_date: moment().format('YYYY-MM-DD'),
  to_date: moment().format('YYYY-MM-DD'),
  from_registration_date: '',
  to_registration_date: '',
  client_fullname: '',
  full_address: '',
  is_verified: '1'
};

function Introductions(props) {
  // eslint-disable-next-line react/prop-types
  const { t, registrations, isLoading, history, data } = props;

  const [params, setParams] = useState(default_params);

  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [selectedFromDate, handleFromDateChange] = useState(moment());
  const [selectedToDate, handleToDateChange] = useState(moment());
  const [isRender, setIsRender] = useState(-1);

  let registrations1;

  const getList = params => {
    const customUrl = convertStrParams(params);
    handleFromDateChange(params.from_date);
    handleToDateChange(params.to_date);

    setParams(params);

    props.getRegistrations({
      countApi: api.countRegistrations,
      api: api.getRegistrations,
      params: {
        page: 1,
        pageSize: 200,
        status: '',
        customUrl: customUrl
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDetail(false);
  };

  const handleChangeStatus = (e, item) => {
    const registration_id = item._id;
    const old_status = item.status;
    const new_status = e.target.value;
    const index = item.index - 1;

    if (old_status == new_status) return false;

    props.setAlert({
      content: `Bạn chắc chắn muốn cập nhật trạng thái cho lịch khám có mã là: ${item.registration_code} ?`,
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
            client
              .put(`/registrations/status/${registration_id}`, {
                old_status: old_status,
                new_status: new_status
              })
              .then(function(res) {
                if (res.success === true) {
                  registrations[index].status = new_status;
                  setIsRender(index);
                  tableConstants.options.pageSize = page_size;

                  props.setAlert({
                    content: res.message,
                    buttons: [
                      {
                        text: 'Đóng',
                        toggleAfterPressed: true,
                        color: 'default'
                      }
                    ]
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      ]
    });
  };

  if (registrations) {
    registrations1 = registrations;
  }

  useEffect(() => {
    let from_date = selectedFromDate
      ? selectedFromDate.format('YYYY-MM-DD')
      : '';
    let to_date = selectedToDate ? selectedToDate.format('YYYY-MM-DD') : '';

    setParams({ ...params, from_date: from_date, to_date: to_date });

    getList(params);
  }, []);

  const columns = [
    {
      title: t('stt'),
      field: 'index'
    },
    {
      title: 'Ngày đăng ký',
      field: 'created_at'
    },
    {
      title: t('registration_code'),
      field: 'registration_code'
    },
    {
      title: 'Tổng tiền',
      field: 'text_total'
    },
    {
      title: t('doctor'),
      field: 'text_doctor'
    },
    {
      title: t('service'),
      field: 'text_service'
    },
    {
      title: t('registration_date'),
      field: 'registration_date'
    },
    {
      title: t('time'),
      field: 'timeRange'
    },
    {
      title: t('clientName'),
      field: 'client_name'
    },
    {
      title: t('phone'),
      field: 'client_phone'
    },
    {
      title: t('address'),
      field: 'full_address'
    },
    {
      title: t('status'),
      field: 'status',
      cellStyle: { textAlign: 'center' },
      render: rowData => {
        if (!['1', '2'].includes(rowData.status + ''))
          return rowData.text_status;
        if (rowData.is_verified != 1) return rowData.text_status;
        return (
          <FilterSelect
            name={'status'}
            label={''}
            value={rowData.status}
            hasPlaceholder={false}
            changeInput={e => handleChangeStatus(e, rowData)}
            options={REGISTRATION_T_STATUS.map(i => ({
              value: i.value,
              label: t(i.label)
            }))}
          />
        );
      }
    },
    {
      title: t('isVerified'),
      field: 'text_is_verified'
    }
  ];

  return (
    <>
      <Box component="div" m={1}>
        <Search
          fromDate={selectedFromDate}
          toDate={selectedToDate}
          getList={getList}
          params={params}
        />
      </Box>

      <Suspense>
        <Detail
          open={openDetail}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          id={detailData}
          data={data}
          getRegistration={props.getRegistration}
        />
        <Filter
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          getList={getList}
        />

        <MaterialTable
          columns={columns}
          data={registrations1.map((i, idx) => ({
            ...i,
            index: idx + 1,
            created_at: formatDateTime(i.created_at),
            registration_date: formatDate(i.registration_date),
            text_total: formatCurrency(i.total_paid, 'VND', '0 VND'),
            timeRange: formatTime(i.from_hour) + ' - ' + formatTime(i.to_hour),
            client_name: i.client ? i.client.fullname : '',
            client_phone:
              i.client && i.client.versions
                ? i.client.versions[0].phone_number
                : '',
            // email: (i.client && i.client.versions) ? i.client.versions[0].email : '',
            full_address:
              i.client && i.client.versions
                ? i.client.versions[0].address.full_address
                : '',
            text_status: REGISTRATION_STATUS[i.status],
            text_is_verified: REGISTRATION_IS_VERIFIED[i.is_verified],
            text_doctor:
              i.doctor && i.doctor.contents && i.doctor.contents[0]
                ? i.doctor.contents[0].fullname
                : '',
            text_service:
              i.service && i.service.contents && i.service.contents[0]
                ? i.service.contents[0].title
                : ''
          }))}
          actions={[
            {
              icon: 'filter_list',
              tooltip: 'Lọc dữ liệu',
              isFreeAction: true,
              onClick: handleClickOpen
            },
            {
              icon: 'info',
              iconProps: { color: 'primary' },
              tooltip: t('info'),
              onClick: (e, rowData) => {
                setOpenDetail(true);
                setDetailData(rowData._id);
              },
              // history.push(`/admin/registrations/update?id=${rowData._id}`),
              position: 'row'
            }
          ]}
          onChangeRowsPerPage={pageSize => {
            page_size = pageSize;
          }}
          isLoading={isLoading}
          {...tableConstants}
        />
      </Suspense>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  data: registration.selectors.item,

  registrations: registration.selectors.items,

  isLoading: createSelector(
    registration.selectors.isLoadingItems,
    registration.selectors.isUpdating,
    (isLoading, isUpdating) => {
      return Boolean(isLoading || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getRegistrations: registration.actions.registrationGetAllAjax,

  updateRegistration: registration.actions.registrationUpdateAjax,

  setAlert: app.actions.setAlert,

  getRegistration: registration.actions.registrationGetAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Introductions);
