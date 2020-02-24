import React from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../CustomInput/CustomInput';
import Danger from '../Typography/Danger';

export default function InputWrapper({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, handleChange, handleBlur }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  callback,
  blurCallback,
  inputProps,
  ...rest
}) {
  const error = !!(touched[field.name] && errors[field.name]);

  const onChange = e => {
    handleChange(e);

    if (callback && typeof callback === 'function') {
      callback(e.target.value);
    }
  };

  const onBlur = e => {
    handleBlur(e);

    if (blurCallback && typeof blurCallback === 'function') {
      blurCallback(e.target.value);
    }
  };

  return (
    <>
      <CustomInput
        inputProps={{ ...field, onChange, onBlur, ...inputProps }}
        error={error}
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

InputWrapper.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  callback: PropTypes.object,
  inputProps: PropTypes.object
};
