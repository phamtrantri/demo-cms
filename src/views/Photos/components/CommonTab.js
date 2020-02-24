import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import SelectWrapper from 'components/SelectWrapper';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import moment from 'moment';
import { COMMON_STATUS } from '../../../constants/index';

function CommonTab(props) {
  const { t } = useTranslation();

  const { departments, services, doctors, values } = props;
  const { image_url } = values;

  return (
    <>
      <Field
        labelText={t('image') + ' *'}
        id="image_url"
        name="image_url"
        component={ImageWrapper}
        type="galleries"
        defaultValue={image_url}
      />

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('department')}
            id="department"
            name="department"
            component={SelectWrapper}
            options={departments.map(i => {
              return {
                value: i._id,
                label: i.contents.length > 0 ? i.contents[0].title : ''
              };
            })}
            hasPlaceholder={true}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('service')}
            id="service"
            name="service"
            component={SelectWrapper}
            options={services.map(i => {
              return {
                value: i._id,
                label: i.contents.length > 0 ? i.contents[0].title : ''
              };
            })}
            hasPlaceholder={true}
          />
        </GridItem>
      </GridContainer>

      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('doctor')}
            id="doctor"
            name="doctor"
            component={SelectWrapper}
            options={doctors.map(i => {
              return {
                value: i._id,
                label: i.contents.length > 0 ? i.contents[0].fullname : ''
              };
            })}
            hasPlaceholder={false}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Field
            labelText={t('article')}
            id="article"
            name="article"
            component={SelectWrapper}
            options={doctorStatus}
            hasPlaceholder={false}
          />
        </GridItem>
      </GridContainer> */}

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
            options={COMMON_STATUS.map(status => ({
              value: status.value,
              label: t(status.label)
            }))}
            hasPlaceholder={false}
          />
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CommonTab;
