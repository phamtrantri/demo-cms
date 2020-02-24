import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    zIndex: 25,
    backgroundColor: 'transparent',
    // opacity: 0.3,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  area: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px'
  }
});

export default function CustomLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.area}>
        <CircularProgress disableShrink color="primary" />
      </div>
    </div>
  );
}
