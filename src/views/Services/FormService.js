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
import { service, language, articleService, doctor } from 'reducers';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { CATEGORY_TYPE } from '../../constants';

function FormService(props) {
  const {
    t,
    languages,
    services,
    articleServices,
    doctors,
    data,
    isLoading
  } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getService({ api: api.getService, id });
    }
    props.getArticleService({
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.DICH_VU,
        status: 1
      }
    });
    return () => {
      props.cleanService();
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
        intro_post: i.intro_post || null
      }))
    };
    if (id) {
      props.updateService({ api: api.updateService, params });
    } else {
      props.addService({ api: api.addService, params, onSuccess });
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
          intro_post: i.intro_post ? i.intro_post._id : null
        }))
      : [];

  const defaultContent = {
    title: '',
    handle: '',
    description: '',
    intro_post: ''
  };

  const initData =
    id && data && data.contents
      ? {
          ...data,
          basic_price: data.basic_price.value,
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
          logo: '',
          code: '',
          type: 1,
          display_position: '',
          status: 1,
          included_services: [],
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
            doctors={doctors.filter(i => i.status === 1)}
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
          articles={articleServices.filter(
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
              <CardFooter isHide={initData.is_published ? true : false}>
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

  articleServices: articleService.selectors.items,

  doctors: doctor.selectors.items,

  data: service.selectors.item,

  isLoading: createSelector(
    service.selectors.isUpdating,
    service.selectors.isInserting,
    service.selectors.isLoadingItem,
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
  getService: service.actions.serviceGetAjax,

  addService: service.actions.serviceInsertAjax,

  updateService: service.actions.serviceUpdateAjax,

  cleanService: service.actions.serviceGetClean,

  getArticleService: articleService.actions.articleServiceGetAllAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormService);
