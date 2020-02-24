import React, { Fragment } from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import SelectWrapper from 'components/SelectWrapper';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import moment from 'moment';

function CommonTab(props) {
  const { t } = useTranslation();

  const { values } = props;

  const { avatar } = values;
  const doctorStatus = [
    {value: 1, label: 'Có hiệu lực'},
    {value: 2, label: 'Vô hiệu'}
  ]
  return (
    <Fragment>
      <Field
        labelText={t('avatar')}
        id="avatar"
        name="avatar"
        component={ImageWrapper}
        type="doctor"
        defaultValue={avatar}
      />

      <Field
        labelText={t('doctorCode')}
        id="code"
        name="code"
        component={InputWrapper}
      />

      <GridContainer>
        <GridItem md={6} sm={6} xs={6}>
          <Field
            labelText={t('birthdate')}
            id="birthdate"
            name="birthdate"
            // disableFuture
            component={CustomDatePicker}
            maxDate={moment().subtract(18, 'y')}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={6}>
          <Field
            labelText={t('gender')}
            id="gender"
            name="gender"
            component={SelectWrapper}
            options={[
              { value: 1, label: t('male') },
              { value: 2, label: t('female') }
            ]}
            hasPlaceholder={false}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('displayPosition')}
            id="display_position"
            name="display_position"
            component={InputWrapper}
            inputProps={{ type: 'number' }}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('status')}
            id="status"
            name="status"
            component={SelectWrapper}
            options={doctorStatus}
            hasPlaceholder={false}
          />
        </GridItem>
      </GridContainer>


      {/* <Field
        labelText={'Các dịch vụ'}
        id="services"
        name="services"
        component={CustomTags}
        options={services}
        getOptionLabel={v => v.contents[0].title}
      /> */}
    </Fragment>
  );
}

export default CommonTab;
