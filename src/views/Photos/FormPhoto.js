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

import { photo, language, department, service, doctor } from 'reducers';
import { api } from 'services';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { CATEGORY_TYPE } from '../../constants';
import moment from 'moment';

function FormPhoto(props) {
  const {
    t,
    languages,
    departments,
    services,
    doctors,
    data,
    isLoading
  } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    props.getDepartments({
      countApi: api.countDepartments,
      api: api.getDepartments,
      params: { page: 1, pageSize: 200 }
    });
    if (id) {
      props.getPhoto({ api: api.getPhoto, id });
    }
  }, []);

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      department: v.department ? v.department : null,
      service: v.service ? v.service : null,
      doctor: v.doctor ? v.doctor : null,
      article: v.article ? v.article : null,
      contents: v.contents.map(i => ({
        ...i
      }))
    };

    if (params._id) {
      props.updatePhoto({ api: api.updatePhoto, params });
    } else {
      props.addPhoto({ api: api.addPhoto, params, onSuccess });
    }
  };

  let differenceContents =
    id && data.contents
      ? languages.filter(
          x => !data.contents.map(i => i.language).includes(x.language)
        )
      : [];
  const dataContents =
    id && data.contents
      ? data.contents.map(i => ({
          ...i
        }))
      : [];

  const defaultContent = {
    title: '',
    description: ''
  };

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          department: data.department ? data.department._id : '',
          service: data.service ? data.service._id : '',
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
          image_url: '',
          status: 1,
          department: '',
          service: '',
          doctor: '',
          article: '',
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
            departments={departments.filter(i => i.status === 1)}
            services={services.filter(i => i.status === 1)}
            // doctors={doctors.filter(i => i.status === 1)}
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
  // doctors: doctor.selectors.items,
  // services: service.selectors.items,

  data: photo.selectors.item,

  isLoading: createSelector(
    photo.selectors.isUpdating,
    photo.selectors.isInserting,
    photo.selectors.isLoadingItem,
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
  getDepartments: department.actions.departmentGetAllAjax,

  getPhoto: photo.actions.photoGetAjax,

  addPhoto: photo.actions.photoInsertAjax,

  updatePhoto: photo.actions.photoUpdateAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormPhoto);
