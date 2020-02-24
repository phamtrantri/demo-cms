/*eslint-disable*/
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import Eye from '@material-ui/icons/RemoveRedEyeOutlined';
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js';
import RTLNavbarLinks from 'components/Navbars/RTLNavbarLinks.js';
import { getItem } from '../../utils/storage';

import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const website_url = `http://${getItem('hospital')}`;

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  function containActiveRoute(routeName) {
    return window.location.href.includes(routeName) > -1 ? true : false;
  }
  function activeChildRoute(data = []) {
    return data.some(i => window.location.href.indexOf(i.layout + i.path) > -1);
  }
  const [open, setOpen] = React.useState('');
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes
        .filter(i => !i.hidden)
        .map((prop, key) => {
          const isOpen = open === prop.name;
          let listItemClasses;
          listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
          });
          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });

          // if (prop.name === 'Feedback') {
          //   return (
          //     <a
          //       key={prop.i18Key}
          //       onClick={() => console.log('feedback')}
          //     >
          //       <ListItem button className={classes.itemLink + listItemClasses}>
          //         {typeof prop.icon === 'string' ? (
          //           <Icon
          //             className={classNames(
          //               classes.itemIcon,
          //               whiteFontClasses,
          //               {
          //                 [classes.itemIconRTL]: props.rtlActive
          //               }
          //             )}
          //           >
          //             {prop.icon}
          //           </Icon>
          //         ) : (
          //           <prop.icon
          //             className={classNames(
          //               classes.itemIcon,
          //               whiteFontClasses,
          //               {
          //                 [classes.itemIconRTL]: props.rtlActive
          //               }
          //             )}
          //           />
          //         )}
          //         <ListItemText
          //           primary={props.rtlActive ? prop.rtlName : t(prop.i18Key)}
          //           className={classNames(classes.itemText, whiteFontClasses, {
          //             [classes.itemTextRTL]: props.rtlActive
          //           })}
          //           disableTypography={true}
          //         />
          //       </ListItem>
          //     </a>
          //   );
          // }

          if (prop.children) {
            return (
              <div key={key}>
                <ListItem
                  button
                  className={classes.itemLink}
                  onClick={() => setOpen(isOpen ? '' : prop.name)}
                >
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: props.rtlActive
                        }
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: props.rtlActive
                        }
                      )}
                    />
                  )}
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : t(prop.i18Key)}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive
                    })}
                    disableTypography={true}
                  />
                  {isOpen || activeChildRoute(prop.children) ? (
                    <IconExpandLess className={classes.whiteFont} />
                  ) : (
                    <IconExpandMore className={classes.whiteFont} />
                  )}
                </ListItem>
                <Collapse
                  in={isOpen || activeChildRoute(prop.children)}
                  timeout="auto"
                  unmountOnExit
                >
                  <Divider />
                  <List component="div" disablePadding>
                    {prop.children.map(i => {
                      listItemClasses = classNames({
                        [' ' + classes[color]]: activeRoute(
                          prop.layout + i.path
                        )
                      });
                      return (
                        <NavLink
                          to={prop.layout + i.path}
                          className={classes.item}
                          activeClassName="active"
                          key={i.i18Key}
                        >
                          <ListItem
                            button
                            className={classes.itemLink + listItemClasses}
                          >
                            <ListItemText
                              primary={t(i.i18Key)}
                              className={classNames(
                                classes.itemChildText,
                                whiteFontClasses
                              )}
                              disableTypography={true}
                            />
                          </ListItem>
                        </NavLink>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          }

          return (
            <NavLink
              to={prop.layout + prop.path}
              className={classNames(classes.item, {
                [classes.settingsItem]: prop.path === '/settings'
              })}
              activeClassName="active"
              key={prop.i18Key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : t(prop.i18Key)}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <Link
        to="/"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </Link>

      <div style={{ position: 'absolute', right: 10, top: 22 }}>
        <a
          href={website_url}
          title="Xem website của bạn"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon className={classNames(classes.itemIcon, classes.whiteFont)}>
            <Eye />
          </Icon>
        </a>
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          // anchor={'left'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {/* {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          // anchor={'left'}
          variant="permanent"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
