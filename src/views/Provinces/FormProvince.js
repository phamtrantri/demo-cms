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

import { api } from 'services';
import { province, language } from 'reducers';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';

function FormService(props) {
  const {
    t,
    languages,
    data,
    isLoading
  } = props;

  const { id } = queryString.parse(props.location.search);
  useEffect(() => {
    if (id) {
      props.getProvince({ api: api.getProvince, id });
    }
    return () => {
      props.cleanProvince();
    };
  }, []);

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v,
      contents: v.contents.map(i => ({
        ...i,
      }))
    };
    if (id) {
      props.updateProvince({ api: api.updateProvince, params });
    } else {
      props.addProvince({ api: api.addProvince, params, onSuccess });
    }
  };

  let differenceContents =
    id && data && data.contents
      ? languages.filter(
          x => !data.contents.map(i => i.language).includes(x.language)
        )
      : [];

  const dataContents =
    id && data && data.contents
      ? data.contents.map(i => ({
          ...i,
        }))
      : [];

  const defaultContent = {
    description: '',
  };

  const initData =
    id && data && data.contents
      ? {
          ...data,
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
          code: '',
          status: 1,
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
  data: province.selectors.item,

  isLoading: createSelector(
    province.selectors.isUpdating,
    province.selectors.isInserting,
    province.selectors.isLoadingItem,
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
  getProvince: province.actions.provinceGetAjax,

  addProvince: province.actions.provinceInsertAjax,

  updateProvince: province.actions.provinceUpdateAjax,

  cleanProvince: province.actions.provinceGetClean,

};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormService);
