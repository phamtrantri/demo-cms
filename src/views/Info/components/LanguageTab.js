import React, { Fragment } from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

// core components
import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import SelectWrapper from 'components/SelectWrapper';

function LanguageTab(props) {
  const { t } = useTranslation();

  const { values, index, districts, provinces, setFieldValue } = props;

  const { cover_image, city } = values.contents[index];

  return (
    <Fragment>
      <Field
        labelText={t('coverImage')}
        id={`contents.${index}.cover_image`}
        name={`contents.${index}.cover_image`}
        component={ImageWrapper}
        type="info"
        defaultValue={cover_image}
      />

      <Field
        labelText={t('coverVideo')}
        id={`contents.${index}.cover_video`}
        name={`contents.${index}.cover_video`}
        component={InputWrapper}
      />

      <Field
        labelText={t('hospitalName')}
        id={`contents.${index}.name`}
        name={`contents.${index}.name`}
        component={InputWrapper}
      />

      <Field
        labelText={t('introduction')}
        id={`contents.${index}.introduction`}
        name={`contents.${index}.introduction`}
        component={InputWrapper}
        inputProps={{
          multiline: true,
          rows: 5
        }}
      />

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('country')}
            id={`contents.${index}.country`}
            name={`contents.${index}.country`}
            component={InputWrapper}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('city')}
            id={`contents.${index}.city`}
            name={`contents.${index}.city`}
            component={SelectWrapper}
            options={provinces.map(i => ({
              value: i.id,
              label: i.name
            }))}
            callback={() => setFieldValue(`contents.${index}.district`, '')}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('district')}
            id={`contents.${index}.district`}
            name={`contents.${index}.district`}
            component={SelectWrapper}
            options={districts
              .filter(i => city && i.province_id === city)
              .map(i => ({
                value: i.id,
                label: i.name
              }))}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={12}>
          <Field
            labelText={t('ward')}
            id={`contents.${index}.ward`}
            name={`contents.${index}.ward`}
            component={InputWrapper}
          />
        </GridItem>
      </GridContainer>

      <Field
        labelText={t('address')}
        id={`contents.${index}.full_address`}
        name={`contents.${index}.full_address`}
        component={InputWrapper}
      />

      <Field
        labelText={t('seoTitle')}
        id={`contents.${index}.seo_title`}
        name={`contents.${index}.seo_title`}
        component={InputWrapper}
      />

      <Field
        labelText={t('seoKeywords')}
        id={`contents.${index}.seo_keywords`}
        name={`contents.${index}.seo_keywords`}
        component={InputWrapper}
        inputProps={{
          multiline: true,
          rows: 2
        }}
      />

      <Field
        labelText={t('seoDescription')}
        id={`contents.${index}.seo_description`}
        name={`contents.${index}.seo_description`}
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
