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

import { doctor, language, service, articleDoctor } from 'reducers';
import { api } from 'services';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { CATEGORY_TYPE } from '../../constants';
import moment from 'moment';

function FormDoctor(props) {
  const { t, languages, services, articleDoctors, data, isLoading } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getDoctor({ api: api.getDoctor, id });
    }
    props.getArticleDoctor({
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.BAC_SI,
        status: 1
      }
    });
  }, []);

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      display_position: v.display_position || undefined,
      contents: v.contents.map(i => ({
        ...i,
        profile_post: i.profile_post || null
      }))
    };
    if (params._id) {
      props.updateDoctor({ api: api.updateDoctor, params });
    } else {
      props.addDoctor({ api: api.addDoctor, params, onSuccess });
    }
  };

  let differenceContents =
    id && data && data.doctor && data.doctor.contents
      ? languages.filter(
          x => !data.doctor.contents.map(i => i.language).includes(x.language)
        )
      : [];

  const dataContents =
    id && data && data.doctor && data.doctor.contents
      ? data.doctor.contents.map(i => ({
          ...i,
          profile_post: i.profile_post ? i.profile_post._id : ''
        }))
      : [];

  const defaultContent = {
    CV_url: '',
    edu_title: '',
    fullname: '',
    handle: '',
    introduction: '',
    major: '',
    profile_post: ''
  };

  const initData =
    id && !isEmpty(data) && data.doctor
      ? {
          ...data.doctor,
          contents:
            differenceContents.length > 0
              ? dataContents.concat(
                  differenceContents.map(i => ({
                    language: i.language,
                    ...defaultContent
                  }))
                )
              : dataContents
        }
      : {
          avatar: '',
          code: '',
          birthdate: moment().subtract(18, 'y'),
          gender: 1,
          status: 1,
          display_position: '',
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
            services={services.filter(i => i.status === 1)}
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
          articles={articleDoctors.filter(elem => elem.language === i.language)}
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

  services: service.selectors.items,

  articleDoctors: articleDoctor.selectors.items,

  data: doctor.selectors.item,

  isLoading: createSelector(
    doctor.selectors.isUpdating,
    doctor.selectors.isInserting,
    doctor.selectors.isLoadingItem,
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
  getDoctor: doctor.actions.doctorGetAjax,

  addDoctor: doctor.actions.doctorInsertAjax,

  updateDoctor: doctor.actions.doctorUpdateAjax,

  getArticleDoctor: articleDoctor.actions.articleDoctorGetAllAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormDoctor);
