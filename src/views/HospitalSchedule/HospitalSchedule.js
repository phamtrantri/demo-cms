import React, { useEffect } from 'react';
// @material-ui/core components

// core components
import Button from 'components/CustomButtons/Button.js';
import CardFooter from 'components/Card/CardFooter';
import CustomTabs from 'components/CustomTabs/CustomTabs';

import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { info, language } from 'reducers';
import { createStructuredSelector, createSelector } from 'reselect';
import { Formik, Form } from 'formik';

import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { DAYS } from '../../constants';

function HospitalSchedule(props) {
  const { t, languages, data, isLoading, getInfo } = props;

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const handleSubmit = v => {
    const params = {
      ...v
    };
    props.updateInfo({ ...params, id: data._id });
  };

  let differenceSchedules =
    data && data.working_hours
      ? languages.filter(
          x => !data.working_hours.map(i => i.language).includes(x.language)
        )
      : [];

  const defaultSchedule = {
    from_time_hour: 7,
    from_time_minute: 0,
    end_time_hour: 16,
    end_time_minute: 30
  };

  const dataSchedules =
    data && data.working_hours && data.working_hours.length > 0
      ? data.working_hours.map(i => ({
          ...i,
          data:
            i.data && i.data.length > 0
              ? i.data
              : DAYS.map(d => ({
                  day_of_week: d,
                  name: d === 8 ? 'Chủ nhật' : 'Thứ ' + d,
                  ...defaultSchedule
                }))
        }))
      : [];

  const initData = {
    working_hours:
      data && data.working_hours
        ? differenceSchedules.length > 0
          ? dataSchedules.concat(
              differenceSchedules.map(i => ({
                language: i.language,
                data: DAYS.map(d => ({
                  day_of_week: d,
                  name: d === 8 ? 'Chủ nhật' : 'Thứ ' + d,
                  ...defaultSchedule
                }))
              }))
            )
          : dataSchedules
        : languages.map(i => ({
            language: i.language,
            data: DAYS.map(d => ({
              day_of_week: d,
              name: d === 8 ? 'Chủ nhật' : 'Thứ ' + d,
              ...defaultSchedule
            }))
          }))
  };

  const tabs = formikProps => {
    const languageTabs = languages.map(i => ({
      tabName: i.name,
      // tabIcon: BugReport,
      tabContent: (
        <LanguageTab
          language={i.language}
          index={initData.working_hours.findIndex(
            elem => elem.language === i.language
          )}
          {...formikProps}
        />
      )
    }));

    return languageTabs;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initData}
      onSubmit={handleSubmit}
      // onReset={(v, bag) => bag.resetForm(initData)}
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

  data: info.selectors.data,

  isLoading: createSelector(
    info.selectors.isUpdating,
    info.selectors.isLoading,
    (isUpdating, isLoading) => {
      return Boolean(isUpdating || isLoading);
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
  getInfo: info.actions.getInfoAjax,

  updateInfo: info.actions.updateInfoAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(HospitalSchedule);
