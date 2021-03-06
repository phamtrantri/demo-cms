import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks.js';
import RTLNavbarLinks from './RTLNavbarLinks.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';
import { useTranslation } from 'react-i18next';
import { emitter } from 'emitter';
import store from 'store';
import { auth } from 'reducers';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      const path = prop.layout + prop.path;
      const index = window.location.href.lastIndexOf(path);
      if (index !== -1 && index === window.location.href.length - path.length) {
        name = t(prop.i18Key);
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });

  const logout = () => {
    emitter.emit('alert', {
      content: 'Bạn có muốn đăng xuất?',
      buttons: [
        {
          text: 'Quay lại',
          toggleAfterPressed: true
        },
        {
          text: 'Xác nhận',
          toggleAfterPressed: true,
          color: 'secondary',
          onPress: () => store.dispatch(auth.actions.signOut())
        }
      ]
    });
  };

  const changePassword = () => {
    props.history.push('/admin/change-password');
  };

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? (
            <RTLNavbarLinks logout={logout} changePassword={changePassword} />
          ) : (
            <AdminNavbarLinks logout={logout} changePassword={changePassword} />
          )}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
