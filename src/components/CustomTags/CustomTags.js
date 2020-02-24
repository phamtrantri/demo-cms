import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function CustomTags(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    placeholder,
    field,
    form,
    ...rest
  } = props;
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
      <Autocomplete
        multiple
        filterSelectedOptions
        name={field.name}
        value={field.value || []}
        onChange={(e, v) => form.setFieldValue(field.name, v, false)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label={labelText || ''}
            placeholder={placeholder || ''}
            fullWidth
            InputLabelProps={{ shrink: field.value && field.value.length > 0 }}
          />
        )}
        {...rest}
      />
    </FormControl>
  );
}
