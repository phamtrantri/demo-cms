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
  const serviceStatus = [
    { value: 1, label: 'Có hiệu lực' },
    { value: 2, label: 'Vô hiệu' }
  ];
  return (
    <Fragment>
      <Field
        labelText={t('logo')}
        id="logo"
        name="logo"
        component={ImageWrapper}
        type="service"
        defaultValue={logo}
      />

      <Field
        labelText={t('serviceCode')}
        id="code"
        name="code"
        component={InputWrapper}
      />

      <Field
        labelText={t('type')}
        id="type"
        name="type"
        component={SelectWrapper}
        hasPlaceholder={false}
        options={[
          { value: 1, label: 'Dùng để giới thiệu' },
          { value: 2, label: 'Dùng để bán' },
          { value: 3, label: 'Cả 2' }
        ]}
      />

      <Field
        labelText={t('basic_price')}
        id="basic_price"
        name="basic_price"
        component={InputWrapper}
        type="number"
      />

      <Field
        labelText={t('includedServices')}
        id="included_services"
        name="included_services"
        component={CustomTags}
        options={_id ? services.filter(i => i._id !== _id) : services}
        getOptionLabel={v => v.contents[0].title}
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
        options={serviceStatus}
        hasPlaceholder={false}
      />
      {/* <Field
        labelText={t('doctorTeam')}
        id="doctors"
        name="doctors"
        component={CustomTags}
        options={doctors}
        getOptionLabel={v => v.contents[0].fullname}
      /> */}
    </Fragment>
  );
}

export default CommonTab;
