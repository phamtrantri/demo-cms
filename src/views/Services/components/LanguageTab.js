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
        labelText={t('title')}
        id={`contents.${index}.title`}
        name={`contents.${index}.title`}
        component={InputWrapper}
        blurCallback={v => {
          setFieldValue(`contents.${index}.handle`, returnUniqueHandle(v));
        }}
      />

      <Field
        labelText={t('handle')}
        id={`contents.${index}.handle`}
        name={`contents.${index}.handle`}
        component={InputWrapper}
      />

      <Field
        labelText={t('description')}
        id={`contents.${index}.description`}
        name={`contents.${index}.description`}
        component={InputWrapper}
        inputProps={{
          multiline: true,
          rows: 5
        }}
      />

      <Field
        labelText={'Bài đăng giới thiệu dịch vụ'}
        id={`contents.${index}.intro_post`}
        name={`contents.${index}.intro_post`}
        component={SelectWrapper}
        options={articles.map(i => ({ value: i._id, label: i.title }))}
      />
    </Fragment>
  );
}

export default LanguageTab;
