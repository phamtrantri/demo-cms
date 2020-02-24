import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

function CustomDialog(props, ref) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({});

  useImperativeHandle(ref, () => ({
    show: params => {
      setOpen(true);
      setParams(params);
    }
  }));

  const handleClose = () => {
    setOpen(false);
    setParams({});
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-category-dialog"
      open={open}
    >
      {React.cloneElement(props.children, { ...params })}
    </Dialog>
  );
}

export default forwardRef(CustomDialog);
