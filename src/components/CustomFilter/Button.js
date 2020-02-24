import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

function FilterDate(props) {
  const { t } = useTranslation();
  const { handleReset, handleClose, handleSubmit } = props;

  return (
    <>
      {handleClose ? (
        <Button onClick={handleClose} color="default">
          Đóng
        </Button>
      ) : (
        ''
      )}

      {handleReset ? (
        <Button
          onClick={handleReset}
          color="secondary"
          style={{ marginRight: 'auto' }}
        >
          Đặt lại
        </Button>
      ) : (
        ''
      )}

      {handleSubmit ? (
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Tìm kiếm
        </Button>
      ) : (
        ''
      )}
    </>
  );
}

export default FilterDate;

FilterDate.propTypes = {
  handleReset: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func
};
