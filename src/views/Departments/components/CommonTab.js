import React, { Fragment } from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import SelectWrapper from 'components/SelectWrapper';
import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import CustomTags from 'components/CustomTags/CustomTags';

function CommonTab(props) {
  const { t } = useTranslation();

  const { services, values } = props;

  const { logo, services: _services } = values;
  const departmentStatus = [
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
        type="department"
        defaultValue={logo}
      />

      <Field
        labelText={t('departmentCode')}
        id="code"
        name="code"
        component={InputWrapper}
      />

      <Field
        labelText={'Các dịch vụ'}
        id="services"
        name="services"
        component={CustomTags}
        options={services.filter(
          i => !_services.some(elem => elem._id === i._id)
        )}
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
        options={departmentStatus}
        hasPlaceholder={false}
      />
    </Fragment>
  );
}

export default CommonTab;
