import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import SelectWrapper from 'components/SelectWrapper';
import CustomTags from 'components/CustomTags/CustomTags';

function CommonTab(props) {
  const { t } = useTranslation();

  const { services, values } = props;

  const { logo, _id } = values;
  const servicePriceTypeStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ]
  return (
    <Fragment>
      <Field
        labelText={t('servicePriceTypeCode')}
        id="code"
        name="code"
        component={InputWrapper}
      />
      <Field
        labelText={t('status')}
        id="status"
        name="status"
        component={SelectWrapper}
        options={servicePriceTypeStatus}
        hasPlaceholder={false}
      />
    </Fragment>
  );
}

export default CommonTab;
