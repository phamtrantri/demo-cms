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
import CustomDateTimePicker from 'components/CustomDateTimePicker/CustomDateTimePicker';
import CustomTimePicker from 'components/CustomTimePicker/CustomTimePicker';
import CustomTags from 'components/CustomTags/CustomTags';
import { servicePrice, service, servicePriceType, doctor } from 'reducers';
import { api } from 'services';
import withLoading from 'utils/loading';
import { DAYS } from '../../constants';
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
  // grid: {
  //   margin: '0 !important'
  // }
});

function FormServicePrice(props) {
  const classes = useStyles();

  const { t, isLoading, data, services, servicePriceTypes, doctors } = props;
  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    props.getServicePriceTypes({
      countApi: api.countServicePriceTypes,
      api: api.getServicePriceTypes,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    if (id) {
      props.getServicePrice({ api: api.getServicePrice, id });
    }
  }, []);
  const servicePriceStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ];
  const initData =
    id && data
      ? {
          ...data,
          doctor: data.doctor ? data.doctor._id : null,
          service: data.service ? data.service._id : null,
          type: data.type ? data.type._id : null
        }
      : {
          service: '',
          doctor: '',
          type: '',
          unit: '',
          value: '',
          start_date: null,
          end_date: null,
          from_applied_hour: null,
          to_applied_hour: null,
          applied_week_days: [],
          status: 1
        };

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      service: v.service || null,
      doctor: v.doctor || null,
      type: v.type || null
    };
    if (params._id) {
      props.updateServicePrice({ api: api.updateServicePrice, params });
    } else {
      props.addServicePrice({ api: api.addServicePrice, params, onSuccess });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        service: yup.string().required(),
        type: yup.string().required(),
        value: yup.number().required(),
        unit: yup.string().required()
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
                  {id ? t('updateServicePrice') : t('addServicePrice')}
                </h4>
              </CardHeader>
              <CardBody>
                <Field
                  labelText={t('service') + ' *'}
                  id="service"
                  name="service"
                  component={SelectWrapper}
                  options={services.map(i => ({
                    value: i._id,
                    label: i.contents[0].title
                  }))}
                />
                <Field
                  labelText={t('doctor')}
                  id="doctor"
                  name="doctor"
                  component={SelectWrapper}
                  options={doctors
                    .filter(doc => {
                      // console.log(service)
                      return doc.services.some(e => e._id === service);
                    })
                    .map(i => ({
                      value: i._id,
                      label: i.contents[0].fullname
                    }))}
                />
                <Field
                  labelText={t('type') + ' *'}
                  id="type"
                  name="type"
                  component={SelectWrapper}
                  options={servicePriceTypes.map(i => ({
                    value: i._id,
                    label: i.contents[0].description
                  }))}
                />
                <Field
                  labelText={t('appliedWeekDays')}
                  id="applied_week_days"
                  name="applied_week_days"
                  component={CustomTags}
                  options={
                    data.applied_week_days
                      ? DAYS.filter(i => {
                          return applied_week_days
                            ? !applied_week_days.some(elem => elem === i)
                            : true;
                        })
                      : DAYS
                  }
                  getOptionLabel={v => (v !== 8 ? `Thứ ${v}` : 'Chủ nhật')}
                />
                <GridContainer>
                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('fromAppliedHour')}
                      id="from_applied_hour"
                      name="from_applied_hour"
                      disablePast
                      component={CustomTimePicker}
                    />
                  </GridItem>
                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('toAppliedHour')}
                      id="to_applied_hour"
                      name="to_applied_hour"
                      clearable
                      component={CustomTimePicker}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('price') + ' *'}
                      id="value"
                      name="value"
                      component={InputWrapper}
                      type="number"
                    />
                  </GridItem>

                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('unit') + ' *'}
                      id="unit"
                      name="unit"
                      component={InputWrapper}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('startDate')}
                      id="start_date"
                      name="start_date"
                      // disablePast
                      component={CustomDateTimePicker}
                    />
                  </GridItem>

                  <GridItem md={6} sm={6} xs={12}>
                    <Field
                      labelText={t('endDate')}
                      id="end_date"
                      name="end_date"
                      // disablePast
                      clearable
                      component={CustomDateTimePicker}
                    />
                  </GridItem>
                </GridContainer>
                <Field
                  labelText={t('status')}
                  id="status"
                  name="status"
                  component={SelectWrapper}
                  options={servicePriceStatus}
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
        );
      }}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  services: service.selectors.items,
  servicePriceTypes: servicePriceType.selectors.items,
  doctors: doctor.selectors.items,
  data: servicePrice.selectors.item,

  isLoading: createSelector(
    servicePrice.selectors.isLoadingItem,
    servicePrice.selectors.isInserting,
    servicePrice.selectors.isUpdating,
    (isLoading, isInserting, isUpdating) => {
      return Boolean(isLoading || isInserting || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getServicePrice: servicePrice.actions.servicePriceGetAjax,
  getServicePriceTypes: servicePriceType.actions.servicePriceTypeGetAllAjax,
  addServicePrice: servicePrice.actions.servicePriceInsertAjax,

  updateServicePrice: servicePrice.actions.servicePriceUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormServicePrice);
