import React from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';
// import { login } from '../../../reducers/auth/auth.actions';
// import Loading from '../../common/Loading/Loading';
import { Formik, Form, Field } from 'formik';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import InputWrapper from 'components/InputWrapper';
import { createStructuredSelector, createSelector } from 'reselect';
import { makeStyles } from '@material-ui/styles';
import { auth } from 'reducers';
import * as yup from 'yup';
import withLoading from 'utils/loading';
import CardHeader from 'components/Card/CardHeader';

const useStyles = makeStyles({
  grid: {
    margin: '0 !important'
  },
  cardMB: {
    marginBottom: 0
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
});

const ResetPassword = props => {
  const { t, resetPassword, isLoading, history } = props;

  const classes = useStyles();

  const { token } = queryString.parse(props.location.search);

  const goToLogin = () => {
    history.replace('/admin/authorization/login');
  };

  React.useEffect(() => {
    if (!token) {
      return goToLogin();
    }
  }, []);

  const initData = {
    password: ''
  };

  const handleSubmit = v => {
    const params = {
      password: v.password,
      token
    };
    const onSuccess = () => {
      goToLogin();
    };
    resetPassword({ params, onSuccess });
  };

  return (
    <GridContainer
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
      style={{ minHeight: '-webkit-fill-available' }}
    >
      <GridItem>
        <Formik
          initialValues={initData}
          onSubmit={handleSubmit}
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required()
              .min(6, 'Mật khẩu có độ dài tối thiểu là 6')
          })}
        >
          {() => (
            <Form>
              <Card profile>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Đặt lại mật khẩu</h4>
                </CardHeader>
                <CardBody
                  style={
                    window.innerWidth > 768
                      ? {
                          padding: 40,
                          width: 350
                        }
                      : window.innerWidth > 320
                      ? { padding: 40, width: 240 }
                      : { padding: 30 }
                  }
                >
                  <Field
                    labelText={t('password')}
                    id="password"
                    name="password"
                    type="password"
                    component={InputWrapper}
                  />

                  <Box p={1} />
                  {window.innerWidth > 320 ? (
                    <GridContainer
                      justify="space-between"
                      alignItems="center"
                      className={classes.grid}
                    >
                      <Link to={'/admin/authorization/login'}>
                        {t('login')}
                      </Link>

                      <Button
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                      >
                        {t('submit')}
                      </Button>
                    </GridContainer>
                  ) : (
                    <GridContainer direction="column" alignItems="center">
                      <Button
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                      >
                        {t('submit')}
                      </Button>

                      <Box p={1} />
                      <Link to={'/admin/authorization/login'}>
                        {t('login')}
                      </Link>
                    </GridContainer>
                  )}
                </CardBody>
              </Card>
            </Form>
          )}
        </Formik>
      </GridItem>
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: createSelector(auth.selectors.isResetting, isLoading =>
    Boolean(isLoading)
  )
});

const mapDispatchToProps = {
  resetPassword: auth.actions.resetPasswordAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(ResetPassword);
