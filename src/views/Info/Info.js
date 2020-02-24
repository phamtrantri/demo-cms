import React, { useEffect } from 'react';
// @material-ui/core components

// core components
import Button from 'components/CustomButtons/Button.js';
import CardFooter from 'components/Card/CardFooter';
import CustomTabs from 'components/CustomTabs/CustomTabs';

import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { info, language, province, district } from 'reducers';
import { createStructuredSelector, createSelector } from 'reselect';
import { Formik, Form } from 'formik';

import CommonTab from './components/CommonTab';
import LanguageTab from './components/LanguageTab';
import withLoading from 'utils/loading';

function HosiptalInfo(props) {
  const {
    t,
    languages,
    provinces,
    districts,
    data,
    isLoading,
    getInfo
  } = props;

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const handleSubmit = v => {
    const params = {
      ...v,
      contents: v.contents.map(i => {
        const province = i.city
          ? provinces.find(elem => elem.id === i.city)
          : '';
        const district = i.district
          ? districts.find(elem => elem.id === i.district)
          : '';
        return {
          ...i,
          city: province ? province.name : '',
          district: district ? district.name : ''
        };
      })
    };
    props.updateInfo({ ...params, id: data._id });
  };

  // const commonTab = [
  //   {
  //     tabName: t('commonInfo'),
  //     // tabIcon: BugReport,
  //     tabContent: (
  //       <CommonTab
  //         info={hospitalInfo}
  //         onSubmit={handleSubmit}
  //         isLoading={isLoading}
  //       />
  //     )
  //   }
  // ];

  // const languageTabs = languages.map(i => ({
  //   tabName: i.name || t(LANGUAGE_MAP[i.language]),
  //   // tabIcon: BugReport,
  //   tabContent: (
  //     <LanguageTab
  //       info={
  //         (hospitalInfo &&
  //           hospitalInfo.contents &&
  //           hospitalInfo.contents.find(elem => elem.language === i.language)) ||
  //         {}
  //       }
  //       language={i.language}
  //       onSubmit={handleSubmit}
  //       isLoading={isLoading}
  //     />
  //   )
  // }));

  // const tabs = commonTab.concat(languageTabs);

  // return <CustomTabs headerColor="primary" tabs={tabs} />;

  let differenceContents =
    data && data.contents
      ? languages.filter(
          x => !data.contents.map(i => i.language).includes(x.language)
        )
      : [];

  const dataContents =
    data && data.contents
      ? data.contents.map(i => {
          const province = i.city
            ? provinces.find(elem => elem.name === i.city)
            : '';
          const district = i.district
            ? districts.find(elem => elem.name === i.district)
            : '';
          return {
            ...i,
            city: province ? province.id : '',
            district: district ? district.id : ''
          };
        })
      : [];

  const initData = {
    ref_code: '',
    register_min_hours: '',
    register_max_hours: '',
    logo: '',
    background_image: '',
    favicon: '',
    ...data,
    hotlines:
      data.hotlines && data.hotlines.length > 0
        ? data.hotlines
        : [{ title: '', number: '', language: 'vi' }],
    emails:
      data.emails && data.emails.length > 0
        ? data.emails
        : [{ title: '', number: '', language: 'vi' }],
    fax_numbers:
      data.fax_numbers && data.fax_numbers.length > 0
        ? data.fax_numbers
        : [{ title: '', number: '', language: 'vi' }],
    socials: {
      facebook: '',
      google: '',
      twitter: '',
      linkedin: '',
      ...data.socials
    },
    contents:
      data && data.contents
        ? differenceContents.length > 0
          ? dataContents.concat(
              differenceContents.map(i => ({
                title: '',
                introduction: '',
                cover_image: '',
                cover_video: '',
                country: i.language === 'vi' ? 'Việt Nam' : '',
                city: '',
                district: '',
                ward: '',
                full_address: '',
                language: i.language
              }))
            )
          : dataContents
        : languages.map(i => ({
            title: '',
            introduction: '',
            cover_image: '',
            cover_video: '',
            country: i.language === 'vi' ? 'Việt Nam' : '',
            city: '',
            district: '',
            ward: '',
            full_address: '',
            seo_title: '',
            seo_keywords: '',
            seo_description: '',
            language: i.language
          }))
  };

  const tabs = formikProps => {
    const commonTab = [
      {
        tabName: t('commonInfo'),
        // tabIcon: BugReport,
        tabContent: <CommonTab languages={languages} {...formikProps} />
      }
    ];

    const languageTabs = languages.map(i => ({
      tabName: i.name,
      // tabIcon: BugReport,
      tabContent: (
        <LanguageTab
          language={i.language}
          provinces={provinces}
          districts={districts}
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

  provinces: province.selectors.items,

  districts: district.selectors.items,

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

export default compose(...enhancers)(HosiptalInfo);
