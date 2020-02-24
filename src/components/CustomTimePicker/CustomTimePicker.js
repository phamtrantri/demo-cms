import React from 'react';
import MomentUtils from '@date-io/moment'; // choose your lib
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function CustomDatePicker(props) {
  const classes = useStyles();
  const { formControlProps, labelText, id, field, form, ...rest } = props;

  return (
    <FormControl
      fullWidth
      {...formControlProps}
      className={
        (formControlProps ? formControlProps.className : '') +
        ' ' +
        classes.formControl
      }
    >
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <TimePicker
          name={field.name}
          value={field.value}
          onChange={time => {console.log(time); return form.setFieldValue(field.name, time, false)}}
          inputVariant="outlined"
          id={id}
          label={labelText || ''}
          ampm={false}
          format="HH:mm"
          cancelLabel={'Huỷ'}
          okLabel={'Xác nhận'}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}
