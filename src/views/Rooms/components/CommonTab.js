import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

import InputWrapper from 'components/InputWrapper';
import SelectWrapper from 'components/SelectWrapper';
import { COMMON_STATUS } from '../../../constants/index';

function CommonTab(props) {
  const { t } = useTranslation();
  const { departments, locations, values } = props;

  return (
    <>
      <Field
        labelText={t('department') + ' *'}
        id="department"
        name="department"
        component={SelectWrapper}
        options={departments.map(item => ({
          value: item._id,
          label: item.contents.length > 0 ? item.contents[0].title : ''
        }))}
        hasPlaceholder={true}
      />

      <Field
        labelText={t('location') + ' *'}
        id="location"
        name="location"
        component={SelectWrapper}
        hasPlaceholder={true}
        options={locations.map(item => ({
          value: item._id,
          label: item.contents[0].area_name
        }))}
      />

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
