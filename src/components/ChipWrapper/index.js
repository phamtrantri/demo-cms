import React from 'react';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function ChipWrapper({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  formControlProps,
  id,
  labelText
  // inputProps,
}) {
  const classes = useStyles();
  // const error = !!(touched[field.name] && errors[field.name]);

  const onChange = chips => {
    setFieldValue(field.name, chips);
  };

  const onDelete = (v, index) => {
    const chips: Array = field.value;
    chips.splice(index, 1);
    setFieldValue(field.name, chips);
  };

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
      <ChipInput
        label={labelText || ''}
        {...field}
        onChange={onChange}
        onDelete={onDelete}
        InputProps={{ id, name: field.name }}
        variant="outlined"
      />
    </FormControl>
  );
}

ChipWrapper.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  formControlProps: PropTypes.object
  // inputProps: PropTypes.object
};
