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
import { department, language, service, articleDepartment } from 'reducers';
import { createStructuredSelector, createSelector } from 'reselect';
import queryString from 'query-string';
import { api } from 'services';
import { Formik, Form } from 'formik';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';
import { CATEGORY_TYPE } from '../../constants';

function FormDepartment(props) {
  const { t, languages, services, articleDepartments, data, isLoading } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getDepartment({ api: api.getDepartment, id });
    }
    props.getArticleDepartment({
      api: api.getArticles,
      params: {
        page: 1,
        pageSize: 200,
        type: CATEGORY_TYPE.CHUYEN_KHOA,
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
      services: v.services.map(i => ({
        service: i._id,
        status: 1
      })),
      contents: v.contents.map(i => ({
        ...i,
        intro_post: i.intro_post || null
      }))
    };
    if (id) {
      props.updateDepartment({ api: api.updateDepartment, params });
    } else {
      props.addDepartment({ api: api.addDepartment, params, onSuccess });
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
          intro_post: i.intro_post ? i.intro_post._id : ''
        }))
      : [];

  const defaultContent = {
    title: '',
    handle: '',
    introduction: '',
    function: '',
    mission: '',
    intro_post: ''
  };

  const initData =
    id && data && data.contents
      ? {
          ...data,
          services: data.services.map(i => i.service),
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
          services: [],
          display_position: '',
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
          articles={articleDepartments.filter(
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

  services: service.selectors.items,

  articleDepartments: articleDepartment.selectors.items,

  data: department.selectors.item,

  isLoading: createSelector(
    department.selectors.isUpdating,
    department.selectors.isInserting,
    department.selectors.isLoadingItem,
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
  getDepartment: department.actions.departmentGetAjax,

  addDepartment: department.actions.departmentInsertAjax,

  updateDepartment: department.actions.departmentUpdateAjax,

  getArticleDepartment: articleDepartment.actions.articleDepartmentGetAllAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormDepartment);
