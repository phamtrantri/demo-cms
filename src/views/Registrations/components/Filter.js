import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import {
  COMMON_STATUS,
  REGISTRATION_T_STATUS,
  REGISTRATION_IS_VERIFIED_T
} from '../../../constants/index';
import { convertStrParams } from '../../../utils/convert';

import FilterInput from 'components/CustomFilter/Input';
import FilterSelect from 'components/CustomFilter/Select';
import FilterDate from 'components/CustomFilter/Date';
import FilterButton from 'components/CustomFilter/Button';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: '20px'
    }
  }
}));

function RegistrationFilter(props) {
  const { t } = useTranslation();

  let params = {
    page: 1,
    pageSize: 200,
    status: '-1',
    doctor_fullname: '',
    from_date: '',
    to_date: '',
    from_registration_date: '',
    to_registration_date: '',
    client_fullname: '',
    full_address: '',
    is_verified: '1'
  };

  const [selectedFromDate, handleFromDateChange] = useState(moment);
  const [selectedToDate, handleToDateChange] = useState(moment);
  const [selectedReFromDate, handleReFromDateChange] = useState(null);
  const [selectedReToDate, handleReToDateChange] = useState(null);
  const [selectedParams, handleParamsChange] = useState(params);

  const classes = useStyles();

  const getListByFilter = () => {
    let params = {
      ...selectedParams,
      from_date: selectedFromDate ? selectedFromDate.format('YYYY-MM-DD') : '',
      to_date: selectedToDate ? selectedToDate.format('YYYY-MM-DD') : '',
      from_registration_date: selectedReFromDate
        ? selectedReFromDate.format('YYYY-MM-DD')
        : '',
      to_registration_date: selectedReToDate
        ? selectedReToDate.format('YYYY-MM-DD')
        : ''
    };

    props.getList(params);
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Lọc dữ liệu'}</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} autoComplete="off">
            <GridContainer>
              <GridItem md={6} sm={6} xs={12} style={{ marginTop: '20px' }}>
                <FilterInput
                  label={'Tên bác sĩ'}
                  name={'doctor_fullname'}
                  value={selectedParams.doctor_fullname}
                  changeInput={handleInput}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12} style={{ marginTop: '20px' }}>
                <FilterInput
                  label={'Tên khách hàng'}
                  name={'client_fullname'}
                  value={selectedParams.client_fullname}
                  changeInput={handleInput}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Ngày đăng ký từ'}
                  value={selectedFromDate}
                  onChangeDate={handleFromDateChange}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Ngày đăng ký đến'}
                  value={selectedToDate}
                  onChangeDate={handleToDateChange}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Ngày khám từ'}
                  value={selectedReFromDate}
                  onChangeDate={handleReFromDateChange}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterDate
                  label={'Ngày khám đến'}
                  value={selectedReToDate}
                  onChangeDate={handleReToDateChange}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={12} sm={12} xs={12}>
                <FilterInput
                  label={'Địa chỉ'}
                  name={'full_address'}
                  value={selectedParams.full_address}
                  changeInput={handleInput}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'status'}
                  label={'Trạng thái'}
                  value={selectedParams.status}
                  changeInput={handleInput}
                  options={REGISTRATION_T_STATUS.map(i => ({
                    value: i.value,
                    label: t(i.label)
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <FilterSelect
                  name={'is_verified'}
                  label={'Kích hoạt'}
                  value={selectedParams.is_verified}
                  changeInput={handleInput}
                  options={REGISTRATION_IS_VERIFIED_T.map(i => ({
                    value: i.value,
                    label: i.label
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

export default RegistrationFilter;
