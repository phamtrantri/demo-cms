import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';
import { COMMON_STATUS } from '../../../constants/index';

function CommonTab(props) {
  const { t } = useTranslation();

  return (
    <>
      <Field
        labelText={t('displayPosition')}
        id="display_position"
        name="display_position"
        component={InputWrapper}
        inputProps={{ type: 'number' }}
      />
      <Field
        labelText={t('status')}
        id="status"
        name="status"
        component={SelectWrapper}
        options={COMMON_STATUS.map(item => ({
          value: item.value,
          label: t(item.label)
        }))}
        hasPlaceholder={false}
      />
    </>
  );
}

export default CommonTab;
