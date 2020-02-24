import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';

import InputWrapper from 'components/InputWrapper';
import ImageWrapper from 'components/ImageWrapper';
import SelectWrapper from 'components/SelectWrapper';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
// import CustomDateTimePicker from 'components/CustomDateTimePicker/CustomDateTimePicker';
import CustomTimePicker from 'components/CustomTimePicker/CustomTimePicker';
import moment from 'moment';
import service from 'sagas/service';
import { DAYS, COMMON_STATUS, HOURS, MINUTES } from '../../../constants/index';

function CommonTab(props) {
  const { t } = useTranslation();

  const hours = HOURS.map(i => ({ value: i, label: i }));

  const minutes = MINUTES.map(i => ({ value: i, label: i }));

  const {
    initData,
    departments,
    services,
    doctors,
    locations,
    rooms,
    values
  } = props;

  const { isUse } = values;

  const department = values.department
    ? departments.find(i => i._id === values.department)
    : null;
  let serviceState = values.service
    ? services.find(i => i._id === values.service)
    : null;

  return (
    <>
      <GridContainer>
        <GridItem md={6} sm={6} xs={6}>
          <Field
            labelText={t('department') + ' *'}
            id="department"
            name="department"
            component={SelectWrapper}
            options={departments.map(i => ({
              value: i._id,
              label:
                i.contents && i.contents.length > 0 ? i.contents[0].title : ''
            }))}
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />

          <Field
            labelText={t('service') + ' *'}
            id="service"
            name="service"
            component={SelectWrapper}
            options={
              department
                ? department.services.map(i => {
                    const s = i.service;
                    return {
                      value: s._id,
                      label:
                        s.contents && s.contents.length > 0
                          ? s.contents[0].title
                          : ''
                    };
                  })
                : []
            }
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />

          <Field
            labelText={t('doctor') + ' *'}
            id="doctor"
            name="doctor"
            component={SelectWrapper}
            options={doctors
              .filter(doc => {
                if (serviceState == null) return null;
                return doc.services.some(e => e._id === serviceState._id);
              })
              .map(i => ({
                value: i._id,
                label: i.contents[0].fullname
              }))}
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />
          <Field
            labelText={t('day_of_week') + ' *'}
            id="day_of_week"
            name="day_of_week"
            component={SelectWrapper}
            options={DAYS.map(d => ({
              value: d,
              label: d === 8 ? 'Chủ nhật' : 'Thứ ' + d
            }))}
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />

          <Field
            labelText={t('fromAppliedHour') + ' *'}
            id="from_hour"
            name="from_hour"
            disablePast
            component={CustomTimePicker}
            disabled={isUse}
          />
          <Field
            labelText={t('toAppliedHour') + ' *'}
            id="end_hour"
            name="end_hour"
            clearable
            component={CustomTimePicker}
            disabled={isUse}
          />
        </GridItem>

        <GridItem md={6} sm={6} xs={6}>
          <Field
            labelText={t('quota') + ' *'}
            id="quota"
            name="quota"
            component={InputWrapper}
            inputProps={{ type: 'number' }}
            disabled={isUse}
          />
          <Field
            labelText={t('room')}
            id="room"
            name="room"
            component={SelectWrapper}
            options={rooms.map(item => ({
              value: item._id,
              label: item.contents[0].room_number
            }))}
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />
          <Field
            labelText={t('location')}
            id="location"
            name="location"
            component={SelectWrapper}
            options={locations.map(item => ({
              value: item._id,
              label: `${item.contents[0].area_name} - ${item.contents[0].floor_name} - ${item.contents[0].building_name}`
            }))}
            hasPlaceholder={true}
            selectProps={{ disabled: isUse }}
          />
          <Field
            labelText={t('from_date') + ' hiệu lực ' + ' *'}
            id="from_date"
            name="from_date"
            // disableFuture
            component={CustomDatePicker}
            // maxDate={moment().subtract(18, 'y')}
            disabled={isUse}
          />
          <Field
            labelText={t('end_date') + ' *'}
            id="end_date"
            name="end_date"
            // disableFuture
            component={CustomDatePicker}
            // maxDate={moment().subtract(18, 'y')}
            disabled={isUse}
          />
          <Field
            labelText={t('status') + ' *'}
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
