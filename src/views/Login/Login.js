import React, { useEffect, useState } from 'react';
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
import { isEmpty } from 'lodash';
import * as yup from 'yup';
import withLoading from 'utils/loading';
import logoUrl from 'assets/img/logo-alt.png';
import Danger from 'components/Typography/Danger';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import axios from 'axios';
import { client } from 'services';
import { accountClient } from 'services';
import { setItem, removeItem } from 'utils/storage';
import { encryptNakedToSystem } from 'utils/crypto';

import configs from '../../configs';

import './Login.css';

const Login = props => {
  const [typeLogin, setTypeLogin] = useState('CMS');
  const [showPassword, setShowPassword] = useState(false);
  const [notAccount, setNotAccount] = useState(false);

  const { t, history, onLogin, token, user, isLoading } = props;

  const initData = {
    username: '',
    password: ''
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const goToHome = () => {
    return history.replace('/');
  };

  const handleResponseSuccessLogin = res => {
    if (res.success === true) {
      const encryptedData = encryptNakedToSystem(JSON.stringify(res.payload));
      setItem('token', encryptedData);

      client.setHeader('Authorization', `Bearer ${res.payload.token}`);
      accountClient.setHeader('Authorization', `Bearer ${res.payload.token}`);
      props.onLoginSuccess({ ...res.payload });
      goToHome();
    }
  };

  const loginByAccountCMS = (v, type = 'CMS') => {
    let url =
      type === 'CMS'
        ? '/v1/account/sign-in-hospital-cms'
        : '/v1/account/sign-in-hospitalsbox-cms';

    const default_hospitals = [
      'localhost',
      'dev-cms-hospitals.hospitalsbox.com'
    ];

    let hospital = window.location.hostname;

    if (default_hospitals.includes(hospital)) {
      hospital = 'dev-hospitals.hospitalsbox.com';
    } else {
      hospital = hospital.slice(4, hospital.length);
    }

    // hospital = 'dev-benhvien1.hospitalsbox.com';
    // console.log(hospital);

    setItem('hospital', hospital);

    return axios.post(
      configs.api.baseAuthURL + url,
      {
        domain: hospital,
        email: v.username,
        password: v.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  };

  const handleSubmit = v => {
    setNotAccount(false);
    loginByAccountCMS(v)
      .then(function(response) {
        const res = response.data;

        if (res.success === true) {
          handleResponseSuccessLogin(res);
        } else {
          setTypeLogin('ADMIN');
          loginByAccountCMS(v, 'ADMIN').then(function(response) {
            const res = response.data;
            if (res.success === true) {
              handleResponseSuccessLogin(res);
            } else {
              setNotAccount(true);
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token && !isEmpty(user)) {
      goToHome();
    }
  }, [token, user]);

  return (
    <div className="login-page">
      <div className="login-page__body">
        <div className="login-page__container">
          <div className="login-page__logo">
            <img src={logoUrl} alt="" />
          </div>
          <Formik
            initialValues={initData}
            onSubmit={handleSubmit}
            validationSchema={yup.object().shape({
              username: yup.string().required(),
              password: yup.string().required()
            })}
          >
            {() => (
              <Form className="login-page__form">
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

                <Field
                  id="password"
                  name="password"
                  type="password"
                  render={props => {
                    const {
                      field,
                      form: { touched, errors }
                    } = props;
                    const error = !!(touched[field.name] && errors[field.name]);
                    return (
                      <div className="login-page__form-control">
                        <div className="login-page__form-control-password">
                          <input
                            placeholder={t('password')}
                            className="login-page__form-input"
                            name="password"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            type={`${showPassword ? 'text' : 'password'}`}
                          />
                          <span
                            className="login-page__toggle-show-password"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </span>
                        </div>
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
                        {notAccount ? (
                          <div
                            style={{
                              textAlign: 'left',
                              width: '100%',
                              marginTop: 5
                            }}
                          >
                            <Danger>Tên đăng nhập hoặc email không đúng</Danger>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    );
                  }}
                />
                <div className="login-page__form-control">
                  <label className="login-page__remain-login">
                    <Checkbox color="primary" style={{ padding: 0 }} />
                    <span>Duy trì đăng nhập</span>
                  </label>
                  <Link
                    className="login-page__link"
                    to={'/admin/authorization/recover'}
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="login-page__form-control">
                  <Button
                    className="login-form__btn"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {t('login')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <Box p={1} /> */}
          <p className="login-page__form-control login-page__form-control--align-left login-page__form-control--font-13">
            Tổng đài hỗ trợ khách hàng: <strong> 1800 6750</strong>
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
  token: auth.selectors.token,

  user: auth.selectors.user,

  isLoading: createSelector(auth.selectors.isSigningIn, isLoading =>
    Boolean(isLoading)
  )
});

const mapDispatchToProps = {
  onLogin: auth.actions.signInAjax,

  onLoginSuccess: auth.actions.signInSucceeded
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(Login);
