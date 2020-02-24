import React from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import GridItem from 'components/Grid/GridItem.js';
// import GridContainer from 'components/Grid/GridContainer.js';
// import Card from 'components/Card/Card.js';
// import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';
// import { login } from '../../../reducers/auth/auth.actions';
// import Loading from '../../common/Loading/Loading';
import { Formik, Form, Field } from 'formik';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
// import InputWrapper from 'components/InputWrapper';
import { createStructuredSelector, createSelector } from 'reselect';
// import { makeStyles } from '@material-ui/styles';
import { auth } from 'reducers';
import * as yup from 'yup';
import withLoading from 'utils/loading';
// import CardHeader from 'components/Card/CardHeader';
import logoUrl from 'assets/img/logo-alt.png';
import Danger from 'components/Typography/Danger';

import '../Login/Login.css';

// const useStyles = makeStyles({
//   grid: {
//     margin: '0 !important'
//   },
//   cardMB: {
//     marginBottom: 0
//   },
//   cardTitleWhite: {
//     color: '#FFFFFF',
//     marginTop: '0px',
//     minHeight: 'auto',
//     fontWeight: '300',
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: '3px',
//     textDecoration: 'none'
//   }
// });

const ForgotPassword = props => {
  const { t, requestResetPassword, isLoading } = props;

  // const classes = useStyles();

  const initData = {
    username: ''
  };

  const handleSubmit = params => {
    const { username } = params;
    requestResetPassword(username);
  };

  return (
    <div className="login-page">
      <div className="login-page__body">
        <div className="login-page__container">
          <div className="login-page__logo">
            <img src={logoUrl} alt="" />
          </div>
          <h3 style={{ textAlign: 'center', fontSize: 23, fontWeight: 500 }}>
            Quên mật khẩu?
          </h3>
          <Formik
            initialValues={initData}
            onSubmit={handleSubmit}
            validationSchema={yup.object().shape({
              username: yup.string().required()
            })}
          >
            {() => (
              <Form className="login-page__form" style={{ marginTop: 0 }}>
                <Field
                  id="username"
                  name="username"
                  render={props => {
                    const {
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }
                    } = props;
                    const error = !!(touched[field.name] && errors[field.name]);
                    return (
                      <div className="login-page__form-control">
                        <input
                          placeholder={t('username')}
                          className="login-page__form-input"
                          name="username"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                        {error && (
                          <div
                            style={{
                              textAlign: 'left',
                              width: '100%',
                              marginTop: 5
                            }}
                          >
                            <Danger>{errors[field.name]}</Danger>
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                <div
                  className="login-page__form-control"
                  style={{ marginBottom: 10 }}
                >
                  <Button color="primary" type="submit" disabled={isLoading}>
                    Gửi yêu cầu
                  </Button>
                </div>
                <div className="login-page__form-control">
                  <Link
                    className="login-page__link"
                    style={{ marginLeft: 0 }}
                    to={'/admin/authorization/login'}
                  >
                    Quay về đăng nhập
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          <p className="login-page__form-control login-page__form-control--align-left login-page__form-control--font-13">
            Tổng đài hỗ trợ khách hàng: <strong>1800 6750</strong>
          </p>
          <p className="login-page__form-control login-page__form-control--align-left login-page__form-control--font-13">
            Hỗ trợ khách hàng các ngày trong tuần từ Thứ Hai đến Chủ nhật
            <br />
            <em>(từ 8h00 – 22h00 hàng ngày)</em>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: createSelector(auth.selectors.isRequesting, isLoading =>
    Boolean(isLoading)
  )
});

const mapDispatchToProps = {
  requestResetPassword: auth.actions.requestResetPasswordAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(ForgotPassword);
