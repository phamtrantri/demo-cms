import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { DAYS, COMMON_STATUS } from '../../../constants/index';
import { convertStrParams } from '../../../utils/convert';

import { api } from 'services';

import FilterInput from 'components/CustomFilter/Input';
import FilterSelect from 'components/CustomFilter/Select';
import FilterDate from 'components/CustomFilter/Date';
import FilterButton from 'components/CustomFilter/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: '20px'
    }
  }
}));

function WorkingScheduleFilter(props) {
  const { t } = useTranslation();
  let params = {
    page: 1,
    pageSize: 200,
    status: '1',
    day_of_week: '-1',
    service_id: '-1',
    doctor_id: '-1',
    room_id: '-1',
    location_id: '-1',
    from_date: '',
    to_date: ''
  };
  const dataInit = props.dataInit;
  const [selectedFromDate, handleFromDateChange] = useState(null);
  const [selectedToDate, handleToDateChange] = useState(null);
  const [selectedParams, handleParamsChange] = useState(params);

  const classes = useStyles();

  const getListByFilter = () => {
    let params = {
      ...selectedParams,
      from_date: selectedFromDate ? selectedFromDate.format('YYYY-MM-DD') : '',
      to_date: selectedToDate ? selectedToDate.format('YYYY-MM-DD') : ''
    };

    props.getList(convertStrParams(params));
    props.handleClose();

    handleParamsChange({ ...params });
  };

  const handleInput = e => {
    const { name, value } = e.target;
    handleParamsChange({ ...selectedParams, [name]: value });
  };

  const handleReset = e => {
    handleFromDateChange(null);
    handleToDateChange(null);
    handleParamsChange({ ...params });
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth={'sm'}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Lọc dữ liệu'}</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} autoComplete="off">
            <GridContainer>
              <GridItem md={6} sm={6} xs={12} style={{ marginTop: '20px' }}>
                <FilterSelect
                  name={'doctor_id'}
                  label={'Bác sĩ'}
                  value={selectedParams.doctor_id}
                  changeInput={handleInput}
                  options={dataInit.doctors.map(i => ({
                    value: i._id,
                    label: i.contents[0].fullname
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12} style={{ marginTop: '20px' }}>
                <FilterSelect
                  name={'service_id'}
                  label={'Dịch vụ'}
                  value={selectedParams.service_id}
                  changeInput={handleInput}
                  options={dataInit.services.map(i => ({
                    value: i._id,
                    label: i.contents[0].title
                  }))}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Từ ngày'}
                  value={selectedFromDate}
                  onChangeDate={handleFromDateChange}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Đến ngày'}
                  value={selectedToDate}
                  onChangeDate={handleToDateChange}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'room_id'}
                  label={'Phòng'}
                  value={selectedParams.room_id}
                  changeInput={handleInput}
                  options={dataInit.rooms.map(i => ({
                    value: i._id,
                    label: i.contents[0].description
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'location_id'}
                  label={'Địa chỉ'}
                  value={selectedParams.location_id}
                  changeInput={handleInput}
                  options={dataInit.locations.map(i => ({
                    value: i._id,
                    label: i.contents[0].area_name
                  }))}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'day_of_week'}
                  label={'Thứ'}
                  value={selectedParams.day_of_week}
                  changeInput={handleInput}
                  options={DAYS.map(d => ({
                    value: d,
                    label: d === 8 ? 'Chủ nhật' : 'Thứ ' + d
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'status'}
                  label={'Trạng thái'}
                  value={selectedParams.status}
                  changeInput={handleInput}
                  options={COMMON_STATUS.map(i => ({
                    value: i.value,
                    label: t(i.label)
                  }))}
                />
              </GridItem>
            </GridContainer>
          </form>
        </DialogContent>
        <DialogActions>
          <FilterButton
            handleReset={handleReset}
            handleClose={props.handleClose}
            handleSubmit={getListByFilter}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WorkingScheduleFilter;
