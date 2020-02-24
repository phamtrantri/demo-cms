import React, { Fragment } from 'react';
import { Field, FieldArray } from 'formik';
import { useTranslation } from 'react-i18next';

// core components
import InputWrapper from 'components/InputWrapper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import SelectWrapper from 'components/SelectWrapper';
import { HOURS, MINUTES } from '../../../constants';

function LanguageTab(props) {
  const { t } = useTranslation();

  const { values, index } = props;

  const { working_hours } = values;

  const data = working_hours[index] ? working_hours[index].data : [];

  const hours = HOURS.map(i => ({ value: i, label: i }));

  const minutes = MINUTES.map(i => ({ value: i, label: i }));

  return (
    <Fragment>
      <FieldArray
        name={`working_hours.${index}.data`}
        render={() => (
          <div>
            {data.map((i, idx) => (
              <Fragment key={idx}>
                <GridContainer>
                  <GridItem md={2} sm={6} xs={6}>
                    <Field
                      labelText={t('dayOfWeek')}
                      id={`working_hours.${index}.data.${idx}.day_of_week`}
                      name={`working_hours.${index}.data.${idx}.day_of_week`}
                      component={InputWrapper}
                      disabled={true}
                    />
                  </GridItem>

                  <GridItem md={2} sm={6} xs={6}>
                    <Field
                      labelText={t('displayName')}
                      id={`working_hours.${index}.data.${idx}.name`}
                      name={`working_hours.${index}.data.${idx}.name`}
                      component={InputWrapper}
                    />
                  </GridItem>

                  <GridItem md={2} sm={3} xs={6}>
                    <Field
                      labelText={t('startHour')}
                      id={`working_hours.${index}.data.${idx}.from_time_hour`}
                      name={`working_hours.${index}.data.${idx}.from_time_hour`}
                      component={SelectWrapper}
                      options={hours}
                      hasPlaceholder={false}
                    />
                  </GridItem>

                  <GridItem md={2} sm={3} xs={6}>
                    <Field
                      labelText={t('startMinute')}
                      id={`working_hours.${index}.data.${idx}.from_time_minute`}
                      name={`working_hours.${index}.data.${idx}.from_time_minute`}
                      component={SelectWrapper}
                      options={minutes}
                      hasPlaceholder={false}
                    />
                  </GridItem>

                  <GridItem md={2} sm={3} xs={6}>
                    <Field
                      labelText={t('endHour')}
                      id={`working_hours.${index}.data.${idx}.end_time_hour`}
                      name={`working_hours.${index}.data.${idx}.end_time_hour`}
                      component={SelectWrapper}
                      options={hours}
                      hasPlaceholder={false}
                    />
                  </GridItem>

                  <GridItem md={2} sm={3} xs={6}>
                    <Field
                      labelText={t('endMinute')}
                      id={`working_hours.${index}.data.${idx}.end_time_minute`}
                      name={`working_hours.${index}.data.${idx}.end_time_minute`}
                      component={SelectWrapper}
                      options={minutes}
                      hasPlaceholder={false}
                    />
                  </GridItem>
                </GridContainer>

                <hr />
              </Fragment>
            ))}
          </div>
        )}
      />
    </Fragment>
  );
}

export default LanguageTab;
