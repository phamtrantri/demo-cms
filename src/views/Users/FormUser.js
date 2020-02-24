import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
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
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
// import SelectWrapper from 'components/SelectWrapper';

import { user } from 'reducers';
import { api } from 'services';
import withLoading from 'utils/loading';
import SelectWrapper from 'components/SelectWrapper';
import { withAdmin } from 'utils/auth';

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

function FormUser(props) {
  const classes = useStyles();

  const { t, isLoading, data } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getUser({ api: api.getUser, id });
    }
  }, []);

  const initData =
    id && !isEmpty(data)
      ? data.account
      : {
          fullname: '',
          password: '',
          phone_number: '',
          email: ''
          // role: 'cms_user'
        };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      account: {
        fullname: v.fullname,
        phone_number: v.phone_number
      }
    };
    if (v.id) {
      props.updateUser({ api: api.updateUser, params });
    } else {
      props.addUser({ api: api.addUser, params, onSuccess });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        // fullname: yup.string().required()
        // password: initData.hasOwnProperty('password')
        //   ? yup
        //       .string()
        //       .required()
        //       .min(6, 'Mật khẩu có độ dài tối thiểu là 6')
        //   : undefined,
        // phone_number: yup
        //   .string()
        //   .required()
        //   .matches(
        //     /^(\+84|0)[1-9][0-9]*$/,
        //     'Số điện thoại không đúng định dạng'
        //   ),
        // email: yup
        //   .string()
        //   .required()
        //   .email(),
        // role: yup.string().required()
      })}
    >
      {() => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {id ? t('updateUser') : t('addUser')}
              </h4>
            </CardHeader>
            <CardBody>
              <Field
                labelText={t('fullname')}
                id="fullname"
                name="fullname"
                component={InputWrapper}
              />

              <GridContainer>
                <GridItem md={6} sm={6} xs={6}>
                  <Field
                    labelText={t('phone')}
                    id="phone_number"
                    name="phone_number"
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem md={6} sm={6} xs={6}>
                  <Field
                    labelText={t('email') + ' *'}
                    id="email"
                    name="email"
                    component={InputWrapper}
                    disabled={true}
                  />
                </GridItem>
              </GridContainer>

              {/* <Field
                labelText={t('role') + ' *'}
                id="role"
                name="role"
                component={SelectWrapper}
                options={[
                  { value: 'cms_user', label: 'Người dùng' },
                  { value: 'cms_admin', label: 'Admin' }
                ]}
                hasPlaceholder={false}
              /> */}
            </CardBody>
            <CardFooter>
              <Button color="danger" type="reset" mx="auto">
                Reset
              </Button>

              <Button color="primary" type="submit" disabled={isLoading}>
                {t('submit')}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  data: user.selectors.item,

  isLoading: createSelector(
    user.selectors.isLoadingItem,
    user.selectors.isInserting,
    user.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getUser: user.actions.userGetAjax,

  addUser: user.actions.userInsertAjax,

  updateUser: user.actions.userUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(withAdmin(FormUser));
