import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

function FilterInput(props) {
  const { t } = useTranslation();
  const { label, name, value, changeInput } = props;
  const type = props.type ? props.type : 'text';

  return (
    <>
      <TextField
        id={name}
        name={name}
        value={value}
        onChange={changeInput}
        label={label}
        type={type}
        fullWidth
        variant="outlined"
      />
    </>
  );
}

export default FilterInput;

FilterInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.node,
  changeInput: PropTypes.func
};
