import React, { useState, useEffect } from 'react';

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
import { DAYS, GENDER_STATUS } from '../../../constants';
import { formatDate, formatTime, formatCurrency } from 'utils/format';

import FilterButton from 'components/CustomFilter/Button';

import { api } from 'services';
import { registration } from 'reducers';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: '20px'
    }
  }
}));

function RegistrationDetail(props) {
  const { t, id, data } = props;

  useEffect(() => {
    if (id) {
      props.getRegistration({ api: api.getRegistration, id });
    }
  }, [id]);

  const classes = useStyles();

  let initData = {};
  if (data) {
    initData = {
      ...data,
      text_service: data.service ? data.service.contents[0].title : '',
      text_room: data.room ? data.room.contents[0].room_number : '',
      text_location: data.location ? data.location.contents[0].area_name : '',
      text_day: data.registration_date
        ? formatDate(data.registration_date)
        : '',
      text_hour: data.from_hour
        ? formatTime(data.from_hour) + ' - ' + formatTime(data.to_hour)
        : '',
      text_doctor: data.doctor ? data.doctor.contents[0].fullname : '',
      text_basic_price: data ? formatCurrency(data.basic_price) : '',
      text_other_price: data ? formatCurrency(data.total_surcharges) : '',
      text_discount_price: data
        ? formatCurrency(data.total_promotional_price)
        : '',
      text_final_price: data ? formatCurrency(data.total_fee) : '',
      text_full_name: data.client ? data.client.fullname : '',
      text_birthday: data.client ? formatDate(data.client.birthdate) : '',
      text_gender: data.client ? GENDER_STATUS[data.client.gender] : '',
      text_id_number: data.client ? data.client.id_number : '',
      text_birth_number: data.client ? data.client.birth_number : '',
      text_phone_number:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].phone_number
          : '',
      text_full_address:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].address.full_address
          : '',
      text_country:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].nationality.contents[0].name
          : '',
      text_folk:
        typeof data.client != 'undefined' &&
        typeof data.client.versions.folk != 'undefined'
          ? data.client.versions[0].folk.contents[0].name
          : '',
      text_relative_full_name:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].relative.fullname
          : '',
      text_relative_relationship:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined' &&
        typeof data.client.versions[0].relative != 'undefined' &&
        data.client.versions[0].relative.relationship
          ? data.client.versions[0].relative.relationship.contents[0].name
          : '',
      text_relative_phone:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].relative.phone
          : '',
      text_relative_email:
        typeof data.client != 'undefined' &&
        typeof data.client.versions != 'undefined'
          ? data.client.versions[0].relative.email
          : ''
    };
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={'md'}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Thông tin đặt lịch khám'}
        </DialogTitle>
        <DialogContent dividers>
          {id ? (
            <GridContainer>
              <GridItem md={12} sm={12} xs={12}>
                <div className={'registration-detail'}>
                  <div className="row mt-2 mb-1">
                    <div className="col-12">
                      <h4 style={{ margin: '10px 0px' }}>Thông tin khám</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-5">
                          <label>Mã đăng ký khám:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.registration_code}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Dịch vụ:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_service}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Phòng:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_room}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Địa chỉ khám:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_location}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Ngày khám:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_day}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Giờ khám:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_hour}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-5">
                          <label>Bác sĩ:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_doctor}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Giá cơ bản</label>
                        </div>
                        <div className="col-7" style={{ textAlign: 'right' }}>
                          <span>{initData.text_basic_price}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Giá phụ thu</label>
                        </div>
                        <div className="col-7" style={{ textAlign: 'right' }}>
                          <span>{initData.text_other_price}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Giá khuyến mại</label>
                        </div>
                        <div className="col-7" style={{ textAlign: 'right' }}>
                          <span>
                            -{' '}
                            {initData.text_discount_price
                              ? initData.text_discount_price
                              : '0 VND'}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Thành tiền</label>
                        </div>
                        <div className="col-7" style={{ textAlign: 'right' }}>
                          <span>{initData.text_final_price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 mb-1">
                    <div className="col-12">
                      <h4>Thông tin bệnh nhân</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-5">
                          <label>Họ và tên:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_full_name}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Ngày sinh:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_birthday}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Số điện thoại:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_phone_number}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Địa chỉ:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_full_address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {initData.text_id_number ? (
                        <div className="row">
                          <div className="col-5">
                            <label>Số chứng minh</label>
                          </div>
                          <div className="col-7">
                            <span>{initData.text_id_number}</span>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}

                      {initData.text_birth_number ? (
                        <div className="row">
                          <div className="col-5">
                            <label>Số khai sinh</label>
                          </div>
                          <div className="col-7">
                            <span>{initData.text_birth_number}</span>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="row">
                        <div className="col-5">
                          <label>Giới tính</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_gender}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Quốc gia:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_country}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Dân tộc:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_folk}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h4 style={{ margin: '10px 0px' }}>
                        Thông tin người thân
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-5">
                          <label>Họ và tên:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_relative_full_name}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Số điện thoại:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_relative_phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-5">
                          <label>Mối quan hệ</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_relative_relationship}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <label>Email:</label>
                        </div>
                        <div className="col-7">
                          <span>{initData.text_relative_email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <FilterButton handleClose={props.handleClose} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegistrationDetail;
