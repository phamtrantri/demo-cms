import React from 'react';
import PropTypes from 'prop-types';

import CustomSelect from '../CustomSelect/CustomSelect';
import Danger from '../Typography/Danger';

export default function SelectWrapper({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  callback,
  selectProps,
  options,
  ...rest
}) {
  const error = !!(touched[field.name] && errors[field.name]);
  const onChange = e => {
    setFieldValue(field.name, e.target.value);
    if (callback && typeof callback === 'function') {
      callback(e.target.value);
    }
  };

  // const theme = theme => {
  //   return {
  //     ...theme,
  //     colors: {
  //       ...theme.colors,
  //       neutral20: error ? '#f86c6b' : theme.colors.neutral20
  //     }
  //   };
  // };

  return (
    <>
      <CustomSelect
        selectProps={{ ...field, onChange, ...selectProps }}
        options={options}
        error={error}
        onChange={onChange}
        {...rest}
      />

      {error ? (
        <span style={{ textAlign: 'left' }}>
          <Danger>{errors[field.name]}</Danger>
        </span>
      ) : null}
    </>
  );
}

SelectWrapper.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  callback: PropTypes.object,
  selectProps: PropTypes.object,
  options: PropTypes.array
};
