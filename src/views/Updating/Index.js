import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
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

import withLoading from 'utils/loading';
import { auth } from 'reducers';

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

function Updating(props) {
  const classes = useStyles();

  const { t, isLoading } = props;

  const initData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const { currentPassword, newPassword } = v;
    const params = {
      current_password: currentPassword,
      new_password: newPassword
    };
    props.Updating({ params, onSuccess });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        currentPassword: yup
          .string()
          .required()
          .min(6, 'Mật khẩu có độ dài tối thiểu là 6'),
        newPassword: yup
          .string()
          .required()
          .min(6, 'Mật khẩu có độ dài tối thiểu là 6'),
        confirmPassword: yup
          .string()
          .required()
          .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
      })}
    >
      {() => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Chức năng này đang được cập nhật
              </h4>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: createSelector(auth.selectors.isChangingPassword, isLoading => {
    return Boolean(isLoading);
  })
});

const mapDispatchToProps = {
  Updating: auth.actions.UpdatingAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(Updating);
