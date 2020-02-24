import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';
// @material-ui/core components
// core components
import InputWrapper from 'components/InputWrapper';
// import SelectWrapper from 'components/SelectWrapper';
// import { returnUniqueHandle } from 'utils/handle';

function LanguageTab(props) {
  const { t } = useTranslation();
  const { index } = props;

  return (
    <>
      <Field
        labelText={t('roomNumber')}
        id={`contents.${index}.room_number`}
        name={`contents.${index}.room_number`}
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
    </>
  );
}

export default LanguageTab;
