import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';
// @material-ui/core components
// core components
import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';
import { returnUniqueHandle } from 'utils/handle';

function LanguageTab(props) {
  const { t } = useTranslation();
  const { index, articles, setFieldValue } = props;

  return (
    <Fragment>
      <Field
        labelText={t('fullname')}
        id={`contents.${index}.fullname`}
        name={`contents.${index}.fullname`}
        component={InputWrapper}
        blurCallback={v =>
          setFieldValue(`contents.${index}.handle`, returnUniqueHandle(v))
        }
      />

      <Field
        labelText={t('handle')}
        id={`contents.${index}.handle`}
        name={`contents.${index}.handle`}
        component={InputWrapper}
      />

      <Field
        labelText={t('eduTitle')}
        id={`contents.${index}.edu_title`}
        name={`contents.${index}.edu_title`}
        component={InputWrapper}
      />

      {/* <Field
        labelText={t('major')}
        id={`contents.${index}.major`}
        name={`contents.${index}.major`}
        component={InputWrapper}
      /> */}

      <Field
        labelText={t('introduction')}
        id={`contents.${index}.introduction`}
        name={`contents.${index}.introduction`}
        component={InputWrapper}
        inputProps={{
          multiline: true,
          rows: 5
        }}
      />

      <Field
        labelText={'Bài đăng giới thiệu bác sĩ'}
        id={`contents.${index}.profile_post`}
        name={`contents.${index}.profile_post`}
        component={SelectWrapper}
        options={articles.map(i => ({ value: i._id, label: i.title }))}
      />

      <Field
        labelText={t('CVUrl')}
        id={`contents.${index}.CV_url`}
        name={`contents.${index}.CV_url`}
        component={InputWrapper}
      />
    </Fragment>
  );
}

export default LanguageTab;
