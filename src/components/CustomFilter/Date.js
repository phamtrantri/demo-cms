import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import MomentUtils from '@date-io/moment'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

function FilterDate(props) {
  const { t } = useTranslation();
  const { label, value, onChangeDate, disableFuture } = props;

  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <DatePicker
          label={label}
          // name={'from_date'}
          value={value}
          inputVariant="outlined"
          onChange={onChangeDate}
          ampm={false}
          fullWidth
          format="DD-MM-YYYY"
          cancelLabel={'Huỷ'}
          okLabel={'Xác nhận'}
          clearLabel={'Xoá'}
          clearable
          disableFuture={disableFuture}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default FilterDate;

FilterDate.propTypes = {
  label: PropTypes.string,
  value: PropTypes.node,
  changeInput: PropTypes.func
};
