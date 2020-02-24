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
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';

import { doctorDepartment, doctor, department } from 'reducers';
import { api } from 'services';
import withLoading from 'utils/loading';

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

function FormDoctorDepartment(props) {
  const classes = useStyles();

  const { t, doctors, departments, isLoading, data } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getDoctorDepartment({ api: api.getDoctorDepartment, id });
    }
  }, []);
  const doctorDepartmentStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ]
  const initData =
    id && !isEmpty(data)
      ? {
        ...data,
        doctor: data.doctor ? data.doctor._id : '',
        department: data.department ? data.department._id : ''
      }
      : {
        doctor: doctors.length > 0 ? doctors[0]._id : '',
        department: departments.length > 0 ? departments[0]._id : '',
        position: '',
        display_position: '',
        status: 1
      };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      display_position: v.display_position || undefined
    };
    if (params._id) {
      props.updateDoctorDepartment({ api: api.updateDoctorDepartment, params });
    } else {
      props.addDoctorDepartment({
        api: api.addDoctorDepartment,
        params,
        onSuccess
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        doctor: yup.string().required(),
        department: yup.string().required()
      })}
    >
      {() => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {id ? t('updateDoctorDepartment') : t('addDoctorDepartment')}
              </h4>
            </CardHeader>
            <CardBody>
              <Field
                labelText={t('doctor')}
                id="doctor"
                name="doctor"
                component={SelectWrapper}
                hasPlaceholder={false}
                options={doctors.map(i => ({
                  value: i._id,
                  label:
                    i.contents && i.contents.length > 0
                      ? i.contents[0].fullname
                      : ''
                }))}
              />

              <Field
                labelText={t('department')}
                id="department"
                name="department"
                component={SelectWrapper}
                hasPlaceholder={false}
                options={departments.map(i => ({
                  value: i._id,
                  label:
                    i.contents && i.contents.length > 0
                      ? i.contents[0].title
                      : ''
                }))}
              />

              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Field
                    labelText={'Vị trí công tác'}
                    id="position"
                    name="position"
                    component={InputWrapper}
                  />
                </GridItem>

                <GridItem xs={12} sm={6} md={6}>
                  <Field
                    labelText={t('displayPosition')}
                    id="display_position"
                    name="display_position"
                    component={InputWrapper}
                    inputProps={{ type: 'number' }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <Field
                    labelText={t('status')}
                    id="status"
                    name="status"
                    component={SelectWrapper}
                    options={doctorDepartmentStatus}
                    hasPlaceholder={false}
                  />
                </GridItem>
              </GridContainer>
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
  doctors: doctor.selectors.items,

  departments: department.selectors.items,

  data: doctorDepartment.selectors.item,

  isLoading: createSelector(
    doctorDepartment.selectors.isLoadingItem,
    doctorDepartment.selectors.isInserting,
    doctorDepartment.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getDoctorDepartment: doctorDepartment.actions.doctorDepartmentGetAjax,

  addDoctorDepartment: doctorDepartment.actions.doctorDepartmentInsertAjax,

  updateDoctorDepartment: doctorDepartment.actions.doctorDepartmentUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormDoctorDepartment);
