import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
// import Clear from '@material-ui/icons/Clear';
// import Check from '@material-ui/icons/Check';
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    options,
    onChange,
    labelProps,
    selectProps,
    // error,
    // success,
    hasPlaceholder = true,
    placeholder = ''
  } = props;

  // const labelClasses = classNames({
  //   [' ' + classes.labelRootError]: error,
  //   [' ' + classes.labelRootSuccess]: success && !error
  // });
  // const underlineClasses = classNames({
  //   [classes.underlineError]: error,
  //   [classes.underlineSuccess]: success && !error,
  //   [classes.underline]: true
  // });
  // const marginTop = classNames({
  //   [classes.marginTop]: labelText === undefined
  // });
  const customLabelProps = selectProps.value ? { shrink: true } : {};
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
      <TextField
        id={id}
        select
        label={labelText || ''}
        SelectProps={{
          native: false,
          // MenuProps: {
          //   className: classes.menu
          // }
          classes: { icon: classes.icon }
        }}
        value={selectProps.value}
        variant="outlined"
        onChange={onChange}
        InputProps={{ ...selectProps, onChange }}
        InputLabelProps={{ ...labelProps, ...customLabelProps }}
        disabled={selectProps.disabled ? selectProps.disabled : false}
      >
        {/* {hasPlaceholder ? <option value={''}>{placeholder}</option> : null}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))} */}
        {hasPlaceholder ? <MenuItem value={''}>{'---'}</MenuItem> : null}
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* {error ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null} */}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  selectProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  options: PropTypes.array
};
