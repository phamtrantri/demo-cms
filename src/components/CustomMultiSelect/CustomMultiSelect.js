import React, { Fragment } from 'react';
import Select from 'react-select';

import InputLabel from '@material-ui/core/InputLabel';

export default function CustomMultiSelect({ id, labelText, ...rest }) {
  const customStyles = {
    container: (base, state) => {
      return {
        ...base,
        margin: '10px 0 20px 0',
        zIndex: state.isFocused ? '999' : '1' //Only when current state focused
      };
    }
  };

  return (
    <Fragment>
      {labelText !== undefined ? (
        <InputLabel
          // className={classes.labelRoot + labelClasses}
          htmlFor={id}
          // {...labelProps}
          style={{ marginTop: '8px' }}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select isMulti isClearable styles={customStyles} id={id} {...rest} />
    </Fragment>
  );
}
