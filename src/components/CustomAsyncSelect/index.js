import React from 'react';
import Select from 'react-select/async';

export default function AsyncSelect({ ...rest }) {
  const customStyles = {
    container: (base, state) => {
      return {
        ...base,
        zIndex: state.isFocused ? '999' : '1' //Only when current state focused
      };
    }
  };

  return <Select cacheOptions defaultOptions styles={customStyles} {...rest} />;
}
