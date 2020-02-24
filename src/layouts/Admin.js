import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from 'routes.js';
import nav from 'nav.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/logo.png';
import {
  info,
  language,
  category,
  doctor,
  department,
  service,
  location,
  room,
  province,
  district
} from 'reducers';
import { api } from 'services';
import { withAuth, filterDataByPermission } from 'utils/auth';
import { createStructuredSelector } from 'reselect';
import { auth } from 'reducers';
import { getItem } from 'utils/storage';

import Updating from 'views/Updating/Index';

let ps;

const switchRoutes = _routes => (
  <Switch>
    {_routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        if (prop.children) {
          return prop.children.map(i => {
            return (
              <Route
                path={prop.layout + i.path}
                component={i.component}
                key={i.i18Key}
                exact={i.exact}
              />
            );
          });
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={prop.exact}
          />
        );
      }
      // return null;
    })}
    <Route path="*" component={Updating} />;
    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

function Admin({
  getInfo,
  getLanguages,
  getCategories,
  getDoctors,
  getDepartments,
  getServices,
  getLocations,
  getRooms,
  getProvinces,
  storeProvinces,
  getDistricts,
  storeDistricts,
  user,
  ...rest
}) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState('blue');
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleImageClick = image => {
  //   setImage(image);
  // };
  // const handleColorClick = color => {
  //   setColor(color);
  // };
  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  React.useEffect(() => {
    const defaultPagination = {
      page: 1,
      pageSize: 500,
      status: 1
    };
    getInfo();
    getLanguages({
      countApi: api.countLanguages,
      api: api.getLanguages,
      params: defaultPagination
    });
    getCategories({
      countApi: api.countCategories,
      api: api.getCategories,
      params: defaultPagination
    });
    getServices({
      countApi: api.countServices,
      api: api.getServices,
      params: defaultPagination
    });
    getDepartments({
      countApi: api.countDepartments,
      api: api.getDepartments,
      params: defaultPagination
    });
    getLocations({
      countApi: api.countLocations,
      api: api.getLocations,
      params: defaultPagination
    });
    getRooms({
      countApi: api.countRooms,
      api: api.getRooms,
      params: defaultPagination
    });
    getDoctors({
      countApi: api.countDoctors,
      api: api.getDoctors,
      params: defaultPagination
    });
  }, []);

  React.useEffect(() => {
    const provinces = getItem('provinces');
    const districts = getItem('districts');
    if (!provinces) {
      getProvinces({
        api: api.getProvinces
      });
    } else {
      storeProvinces(provinces);
    }

    if (!districts) {
      getDistricts({
        api: api.getDistricts
      });
    } else {
      storeDistricts(districts);
    }
  }, []);

  const _routes =
    user && user.role ? filterDataByPermission(routes, user) : routes;
  // ? routes.filter(item => {
  //     if (!item.roles) return item;
  //     if (item.roles && item.roles.includes(user.role)) {
  //       return item;
  //     }
  //     return false;
  //   })

  const _navRoutes =
    user && user.role ? filterDataByPermission(nav, user) : nav;
  // ? nav.filter(item => {
  //     if (!item.roles) return item;
  //     if (item.roles && item.roles.includes(user.role)) {
  //       let children = [];
  //       if (item.children) {
  //         children = item.children.filter(item1 => {
  //           if (item1.roles && item1.roles.includes(user.role)) {
  //             return item1;
  //           }
  //           return false;
  //         });
  //       }

  //       if (children.length) {
  //         item.children = children;
  //       }

  //       return item;
  //     }
  //     return false;
  //   })

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={_navRoutes}
        logoText={'Creative Tim'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={_routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes(_routes)}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes(_routes)}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  info: info.selectors.data,
  token: auth.selectors.token,
  user: auth.selectors.user
});

const mapDispatchToProps = {
  getInfo: info.actions.getInfoAjax,

  getLanguages: language.actions.languageGetAllAjax,

  getCategories: category.actions.categoryGetAllAjax,

  getDoctors: doctor.actions.doctorGetAllAjax,

  getDepartments: department.actions.departmentGetAllAjax,

  getServices: service.actions.serviceGetAllAjax,

  getLocations: location.actions.locationGetAllAjax,

  getRooms: room.actions.roomGetAllAjax,

  getProvinces: province.actions.provinceGetAllAjax,

  storeProvinces: province.actions.provinceGetAllSucceeded,

  getDistricts: district.actions.districtGetAllAjax,

  storeDistricts: district.actions.districtGetAllSucceeded
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Admin));
