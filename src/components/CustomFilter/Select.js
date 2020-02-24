import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { COMMON_STATUS, ALL_STATUS } from '../../constants/index';
import MenuItem from '@material-ui/core/MenuItem';

function FilterSelect(props) {
  const { t } = useTranslation();
  let { label, name, value, options, changeInput, hasPlaceholder } = props;

  hasPlaceholder = typeof hasPlaceholder != 'undefined' ? hasPlaceholder : true;

  return (
    <>
      <TextField
        variant="outlined"
        select
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={changeInput}
      >
        {hasPlaceholder ? (
          <MenuItem value={ALL_STATUS}>{t('all')}</MenuItem>
        ) : null}
        {options && options.length
          ? options.map((item, key) => (
              <MenuItem key={key} value={item.value}>
                {item.label}
              </MenuItem>
            ))
          : ''}
      </TextField>
    </>
  );
}

export default FilterSelect;

FilterSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.node,
  options: PropTypes.array,
  changeInput: PropTypes.func
};
