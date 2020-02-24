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
        labelText={t('description')}
        id={`contents.${index}.description`}
        name={`contents.${index}.description`}
        component={InputWrapper}
        inputProps={{
          multiline: true,
          rows: 5
        }}
      />
    </Fragment>
  );
}

export default LanguageTab;
