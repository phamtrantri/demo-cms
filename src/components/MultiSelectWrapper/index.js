import React from 'react';
import PropTypes from 'prop-types';

import CustomMultiSelect from '../CustomMultiSelect/CustomMultiSelect';

export default function MultiSelectWrapper({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  callback,
  options,
  ...rest
}) {
  const error = !!(touched[name] && errors[name]);
  const onChange = v => {
    setFieldValue(name, v);
    if (callback && typeof callback === 'function') {
      callback();
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
    <CustomMultiSelect
      options={options}
      error={error}
      onChange={onChange}
      name={name}
      value={value}
      {...rest}
    />
  );
}

MultiSelectWrapper.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  callback: PropTypes.object,
  selectProps: PropTypes.object,
  options: PropTypes.array
};
