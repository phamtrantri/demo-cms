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

import { api } from 'services';
import { language, room, department, location } from 'reducers';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';

function FormRoom(props) {
  const { t, languages, data, departments, locations, isLoading } = props;

  const { id } = queryString.parse(props.location.search);

  useEffect(() => {
    if (id) {
      props.getRoom({ api: api.getRoom, id });
    }
    // props.getArticleRoom({
    //   api: api.getArticles,
    //   params: {
    //     page: 1,
    //     pageSize: 200,
    //     status: 1
    //   }
    // });
    return () => {
      props.cleanRoom();
    };
  }, []);

  const handleSubmit = (v, bag) => {
    const onSuccess = () => {
      bag.resetForm(initData);
    };
    const params = {
      ...v
    };

    if (id) {
      props.updateRoom({ api: api.updateRoom, params });
    } else {
      props.addRoom({ api: api.addRoom, params, onSuccess });
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
    room_number: '',
    description: ''
  };

  const initData =
    id && !isEmpty(data)
      ? {
          ...data,
          department: data.department ? data.department._id : '',
          location: data.location ? data.location._id : '',
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
          department: '',
          location: '',
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
            departments={departments.filter(i => i.status === 1)}
            locations={locations.filter(i => i.status === 1)}
            // initData={initData}
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

  locations: location.selectors.items,

  data: room.selectors.item,

  isLoading: createSelector(
    room.selectors.isUpdating,
    room.selectors.isInserting,
    room.selectors.isLoadingItem,
    (isUpdating, isInserting, isLoading) => {
      return Boolean(isUpdating || isInserting || isLoading);
    }
  )

  // isLoadingLanguages: createSelector(
  //   language.selectors.isLoadingItems,
  //   isLoading => {
  //     return Boolean(isLoading);
  //   }
  // )
});

const mapDispatchToProps = {
  getRoom: room.actions.roomGetAjax,

  addRoom: room.actions.roomInsertAjax,

  updateRoom: room.actions.roomUpdateAjax,

  cleanRoom: room.actions.roomGetClean

  // getArticleRoom: articleRoom.actions.articleRoomGetAllAjax
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withLoading()
];

export default compose(...enhancers)(FormRoom);
