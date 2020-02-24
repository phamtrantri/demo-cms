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
import SelectWrapper from 'components/SelectWrapper';

import { doctorService, doctor, service } from 'reducers';
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

function FormDoctorService(props) {
  const classes = useStyles();

  const { t, doctors, services, isLoading, data } = props;

  const { id } = queryString.parse(props.location.search);
  const doctorServiceStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ]
  useEffect(() => {
    if (id) {
      props.getDoctorService({ api: api.getDoctorService, id });
    }
  }, []);

  const initData =
    id && !isEmpty(data)
      ? {
        ...data,
        doctor: data.doctor ? data.doctor._id : '',
        service: data.service ? data.service._id : ''
      }
      : {
        doctor: doctors.length > 0 ? doctors[0]._id : '',
        service: services.length > 0 ? services[0]._id : '',
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
      props.updateDoctorService({ api: api.updateDoctorService, params });
    } else {
      props.addDoctorService({ api: api.addDoctorService, params, onSuccess });
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
        service: yup.string().required()
      })}
    >
      {() => (
        <Form>
          <Card className={classes.cardMB}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {id ? t('updateDoctorService') : t('addDoctorService')}
              </h4>
            </CardHeader>
            <CardBody>
              <Field
                labelText={t('doctor') + ' *'}
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
                labelText={t('service') + ' *'}
                id="service"
                name="service"
                component={SelectWrapper}
                hasPlaceholder={false}
                options={services.map(i => ({
                  value: i._id,
                  label:
                    i.contents && i.contents.length > 0
                      ? i.contents[0].title
                      : ''
                }))}
              />

              <Field
                labelText={t('displayPosition')}
                id="display_position"
                name="display_position"
                component={InputWrapper}
                inputProps={{ type: 'number' }}
              />
              <Field
                labelText={t('status')}
                id="status"
                name="status"
                component={SelectWrapper}
                options={doctorServiceStatus}
                hasPlaceholder={false}
              />
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

  services: service.selectors.items,

  data: doctorService.selectors.item,

  isLoading: createSelector(
    doctorService.selectors.isLoadingItem,
    doctorService.selectors.isInserting,
    doctorService.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getDoctorService: doctorService.actions.doctorServiceGetAjax,

  addDoctorService: doctorService.actions.doctorServiceInsertAjax,

  updateDoctorService: doctorService.actions.doctorServiceUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormDoctorService);
