import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { blue } from '@material-ui/core/colors';
// core components
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import CustomTimePicker from 'components/CustomTimePicker/CustomTimePicker';
import CustomTags from 'components/CustomTags/CustomTags';
import { registration, service, doctor } from 'reducers';
import { api } from 'services';
import withLoading from 'utils/loading';
import { DAYS, GENDER_STATUS } from '../../constants';
import { formatDate, formatTime, formatCurrency } from 'utils/format';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  cardMB: {
    marginBottom: 0
  }
});

function RegistrationDetail(props) {
  const classes = useStyles();

  const { t, isLoading, data } = props;
  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getRegistration({ api: api.getRegistration, id });
    }
  }, []);

  const initData = {
    ...data,
    text_service: data.service ? data.service.contents[0].title : '',
    text_room: data.room ? data.room.contents[0].room_number : '',
    text_location: data.location ? data.location.contents[0].area_name : '',
    text_day: data.registration_date ? formatDate(data.registration_date) : '',
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

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    // const params = {
    //   ...v,
    //   service: v.service || null,
    //   doctor: v.doctor || null,
    //   type: v.type || null
    // };
    // if (params._id) {
    //   props.updateRegistrations({ api: api.updateRegistrations, params });
    // } else {
    //   props.addRegistrations({ api: api.addRegistrations, params, onSuccess });
    // }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        // service: yup.string().required(),
        // type: yup.string().required(),
        // value: yup.number().required(),
        // unit: yup.string().required()
      })}
    >
      {formikProps => {
        const { values } = formikProps;
        const { service, applied_week_days } = values;
        return (
          <Form>
            <Card className={classes.cardMB}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {'Thông tin đặt lịch khám'}
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem md={12} sm={12} xs={12}>
                    <div className={'registration-detail'}>
                      <div className="row mt-2 mb-1">
                        <div className="col-12">
                          <h4>Thông tin khám</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
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
                            <div className="col-7">
                              <span>{initData.text_basic_price}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <label>Giá phụ thu</label>
                            </div>
                            <div className="col-7">
                              <span>{initData.text_other_price}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <label>Giá khuyến mại</label>
                            </div>
                            <div className="col-7">
                              <span>- {initData.text_discount_price}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <label>Thành tiền</label>
                            </div>
                            <div className="col-7">
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
                          <h4>Thông tin người thân</h4>
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
              </CardBody>
              {/* <CardFooter>
                <Button color="danger" type="reset" mx="auto">
                  Reset
                </Button>

                <Button color="primary" type="submit" disabled={isLoading}>
                  {t('submit')}
                </Button>
              </CardFooter> */}
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  data: registration.selectors.item,

  isLoading: createSelector(
    registration.selectors.isLoadingItem,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getRegistration: registration.actions.registrationGetAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(RegistrationDetail);
