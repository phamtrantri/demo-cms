import React, { useState, useEffect } from 'react';
// import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/CloseRounded';
import AttachFile from '@material-ui/icons/AttachFile';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';

import Dropzone from 'react-dropzone';
import { isEmpty } from 'lodash';
import { ErrorMessage } from 'formik';

import styles from 'assets/jss/material-dashboard-react/components/customInputStyle.js';

import { useImage } from './useImage';
import { Fab } from '@material-ui/core';

const useStyles = makeStyles({
  ...styles,
  imgDropzone: {
    border: '2px dashed blue',
    borderRadius: '5px',
    cursor: 'pointer',
    // width: '240px',
    height: '135px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%'
  },
  customDropzone: {
    border: '2px dashed blue',
    borderRadius: '5px',
    background: 'white',
    cursor: 'pointer',
    // width: '240px',
    height: '135px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    maxWidth: '100%'
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 0,
    color: '#fff',
    zIndex: 10
  },
  closeWithLabel: {
    position: 'absolute',
    top: 30,
    right: 0,
    color: '#fff',
    zIndex: 10
  }
});

const WIDTH = 240,
  HEIGHT = 135;

export default function ImageWrapper({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, setFieldError }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  labelText,
  defaultValue,
  labelProps,
  formControlProps,
  id,
  type,
  onDelete,
  callback,
  placeholder = 'Chọn ảnh',
  accept = ['image/*'],
  fileType = 'image',
  width,
  height,
  imageProps
}) {
  const [image, setImage] = useState(value || null);

  const [onDrop] = useImage(
    setFieldValue,
    name,
    setFieldError,
    setImage,
    type,
    callback
  );

  const error = !!(touched[name] && errors[name]);

  const classes = useStyles();

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: !error
  });

  useEffect(() => {
    setImage(defaultValue);
  }, [defaultValue]);

  const handleDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      onDelete();
    } else {
      setFieldValue(name, '');
      setImage(null);
    }
  };

  return (
    <FormControl
      // fullWidth
      {...formControlProps}
      className={
        (formControlProps ? formControlProps.className : '') +
        ' ' +
        classes.formControl
      }
    >
      {labelText ? (
        <label
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText + ' (< 3mb)'}
        </label>
      ) : null}

      <Dropzone
        className="dropzone"
        name={name}
        onDrop={onDrop}
        key={id}
        multiple={false}
        accept={accept}
      >
        {!isEmpty(image) ? (
          <div
            key={image.lastModified}
            className={classes.imgDropzone}
            style={{
              height: height || HEIGHT,
              maxWidth: '100%'
            }}
          >
            {fileType === 'file' ? (
              <AttachFile fontSize="large" />
            ) : (
              <img
                src={image.preview || image}
                key={image.lastModified}
                // width={width || '100%'}
                height={'100%'}
                alt="no data"
                style={{
                  maxWidth: '100%'
                }}
                {...imageProps}
              />
            )}
          </div>
        ) : (
          <div
            className={classes.customDropzone}
            style={{
              width: width || WIDTH,
              height: height || HEIGHT,
              maxWidth: '100%'
            }}
          >
            <div className="custom-dropzone-message">{placeholder}</div>
          </div>
        )}
      </Dropzone>

      {image ? (
        <div className={labelText ? classes.closeWithLabel : classes.close}>
          <Fab color="secondary" size="small" onClick={handleDelete}>
            <CloseIcon />
          </Fab>
        </div>
      ) : null}

      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </FormControl>
  );
}
