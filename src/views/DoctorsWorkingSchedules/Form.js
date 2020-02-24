import React, { useEffect } from 'react';
// @material-ui/core components
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import Button from 'components/CustomButtons/Button.js';
import CardFooter from 'components/Card/CardFooter';
import CustomTabs from 'components/CustomTabs/CustomTabs';

import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import queryString from 'query-string';
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import * as yup from 'yup';

import {
  workingSchedule,
  language,
  department,
  service,
  doctor,
  location,
  room
} from 'reducers';
import { api, workingSchedule as apiWorkingSchedule } from 'services';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { CATEGORY_TYPE } from '../../constants';
import moment from 'moment';

function WorkingSchedule(props) {
  const {
    t,
    languages,
    data,
    departments,
    services,
    doctors,
    locations,
    rooms,
    isLoading
  } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getWorkingSchedule({
        api: apiWorkingSchedule.getWorkingSchedule,
        id
      });
    }

    props.getWorkingSchedules({
      countApi: apiWorkingSchedule.countWorkingSchedules,
      api: apiWorkingSchedule.getWorkingSchedules,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getRooms({
      countApi: api.countRooms,
      api: api.getRooms,
      params: { page: 1, pageSize: 200, status: 1 }
    });
    props.getLocations({
      countApi: api.countLocations,
      api: api.getLocations,
      params: { page: 1, pageSize: 200, status: 1 }
    });
  }, []);

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      room: v.room || null,
      location: v.location || null
    };

    if (params._id) {
      props.updateWorkingSchedule({
        api: apiWorkingSchedule.updateWorkingSchedule,
        params
      });
    } else {
      props.addWorkingSchedule({
        api: apiWorkingSchedule.addWorkingSchedule,
        params,
        onSuccess
      });
    }
  };

  const defaultContent = {
    description: ''
  };

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          isUse: moment() > moment(data.from_date) ? true : false,
          department: data.department._id,
          service: data.service._id,
          doctor: data.doctor._id
        }
      : {
          isUse: false,
          department: '',
          service: '',
          doctor: '',
          day_of_week: '',
          from_hour: null,
          end_hour: null,
          from_date: moment(),
          end_date: moment(),
          room: '',
          location: '',
          quota: 6,
          status: 1,
          type: '',
          contents: languages.map(i => ({
            language: i.language,
            ...defaultContent
          }))
        };

  const tabs = formikProps => {
    const commonTab = [
      {
        tabName: t('commonInfo'),
        // tabIcon: BugReport,
        tabContent: (
          <CommonTab
            departments={departments.filter(i => i.status === 1)}
            services={services.filter(i => i.status === 1)}
            doctors={doctors.filter(i => i.status === 1)}
            locations={locations.filter(i => i.status === 1)}
            rooms={rooms.filter(i => i.status === 1)}
            initData={initData}
            {...formikProps}
          />
        )
      }
    ];

    const languageTabs = languages.map(i => ({
      tabName: i.name,
      // tabIcon: BugReport,
      tabContent: (
        <LanguageTab
          language={i.language}
          index={initData.contents.findIndex(
            elem => elem.language === i.language
          )}
          {...formikProps}
        />
      )
    }));

    return commonTab.concat(languageTabs);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
      validationSchema={yup.object().shape({
        department: yup.string().required(),
        service: yup.string().required(),
        doctor: yup.string().required(),
        day_of_week: yup.number().required(),
        from_hour: yup.string().required(),
        end_hour: yup.string().required(),
        from_date: yup.string().required(),
        end_date: yup.string().required(),
        quota: yup.string().required(),
        status: yup.string().required()
      })}
    >
      {formikProps => (
        <Form>
          <CustomTabs
            headerColor="primary"
            tabs={tabs(formikProps)}
            footer={
              <CardFooter>
                <Button color="danger" type="reset" mx="auto">
                  Reset
                </Button>

                <Button color="primary" type="submit" disabled={isLoading}>
                  {t('submit')}
                </Button>
              </CardFooter>
            }
          />
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = createStructuredSelector({
  languages: language.selectors.items,

  departments: department.selectors.items,
  services: service.selectors.items,
  doctors: doctor.selectors.items,

  locations: location.selectors.items,
  rooms: room.selectors.items,

  data: workingSchedule.selectors.item,

  isLoading: createSelector(
    workingSchedule.selectors.isUpdating,
    workingSchedule.selectors.isInserting,
    workingSchedule.selectors.isLoadingItem,
    (isUpdating, isInserting, isLoading) => {
      return Boolean(isUpdating || isInserting || isLoading);
    }
  ),

  isLoadingLanguages: createSelector(
    language.selectors.isLoadingItems,
    isLoading => {
      return Boolean(isLoading);
    }
  )
});

const mapDispatchToProps = {
  getWorkingSchedule: workingSchedule.actions.workingScheduleGetAjax,

  addWorkingSchedule: workingSchedule.actions.workingScheduleInsertAjax,

  updateWorkingSchedule: workingSchedule.actions.workingScheduleUpdateAjax,

  getWorkingSchedules: workingSchedule.actions.workingScheduleGetAllAjax,

  getLocations: location.actions.locationGetAllAjax,
  getRooms: room.actions.roomGetAllAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(WorkingSchedule);
