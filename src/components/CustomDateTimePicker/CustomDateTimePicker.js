import React from 'react';
import MomentUtils from '@date-io/moment'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function CustomDateTimePicker(props) {
  const classes = useStyles();
  const { formControlProps, labelText, id, field, form, ...rest } = props;

  // const error = form.errors[field.name];

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
        <DateTimePicker
          name={field.name}
          value={field.value}
          onChange={date => form.setFieldValue(field.name, date, false)}
          inputVariant="outlined"
          id={id}
          label={labelText || ''}
          ampm={false}
          format="DD-MM-YYYY HH:mm"
          cancelLabel={'Huỷ'}
          okLabel={'Xác nhận'}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  );
}
