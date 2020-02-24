import React, { useImperativeHandle, forwardRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import {
  successColor,
  warningColor,
  dangerColor
} from 'assets/jss/material-dashboard-react.js';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  successText: {
    color: successColor[0]
  },
  warningText: {
    color: warningColor[0]
  },
  dangerText: {
    color: dangerColor[0]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, type, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        align="center"
        component="h5"
        className={classes[`${type}Text`]}
      >
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function CustomAlert(props, ref) {
  const classes = makeStyles({
    dialogPaper: {
      minHeight: '200px',
      maxHeight: '250px',
      minWidth: '350px',
      maxWidth: '350px'
    }
  })();
  const initData = {
    open: false,
    type: 'warning',
    content: '',
    backdrop: true,
    hasCancelButton: true,
    buttons: []
  };

  const [data, setData] = React.useState(initData);
  const { t } = useTranslation();

  const standardize = params => ({
    ...initData,
    ...params
  });

  const toggle = (): void => {
    setData({ ...data, open: !data.open });
  };

  const title = () => {
    switch (data.type) {
      case 'danger':
        return t('error');
      
      case 'warning':
        return t('warning');

      case 'success':
        return t('success');

      default:
        return t('alert');
    }
  };

  useImperativeHandle(ref, () => ({
    show: params => {
      setData({ ...data, ...standardize(params), open: true });
    }
  }));

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      onClose={toggle}
      aria-labelledby="customized-dialog-title"
      open={data.open}
      disableBackdropClick={!data.backdrop}
    >
      <DialogTitle id="customized-dialog-title" type={data.type}>
        {title()}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom align="center">
          {data.content || t('unknownError')}
        </Typography>
      </DialogContent>
      <DialogActions>
        {data.buttons.map((button, index: number) => {
          return (
            <Button
              key={index}
              onClick={() => {
                if (button.toggleAfterPressed) {
                  toggle();
                }
                if (button.onPress) {
                  button.onPress();
                }
              }}
              color={button.color || 'primary'}
            >
              {button.text}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(CustomAlert);
