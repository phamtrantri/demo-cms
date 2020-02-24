import React from 'react';
import { Redirect } from 'react-router-dom';
import store from 'store';
import { getItem } from './storage';
import CustomLoading from 'components/CustomLoading/CustomLoading';
import { USER_ROLE } from '../constants';

export const withAuth = Component => {
  const Authenticate = props => {
    const encryptedData = getItem('token');
    const token = store.getState().auth.token;

    if (!encryptedData) {
      return <Redirect to="/admin/authorization/login" />;
    }

    if (encryptedData && !token) {
      return <CustomLoading />;
    }

    // if (token && !user) {
    //   return <Component {...props} />;
    //   return <CustomLoading />;
    // }

    return <Component {...props} />;
  };

  return Authenticate;
};

export const withAdmin = Component => {
  const AdminAuthenticate = props => {
    const user = store.getState().auth.user;

    if (!user) {
      return <CustomLoading />;
    }

    // const role = user.role;
    // if (role !== USER_ROLE.ADMIN) {
    //   return <Redirect to="/admin/dashboard" />;
    // }

    // if (token && !user) {
    //   return <Component {...props} />;
    //   return <CustomLoading />;
    // }

    return <Component {...props} />;
  };

  return AdminAuthenticate;
};

export const filterDataByPermission = (items, user) => {
  return items.filter(item => {
    if (!item.roles) return item;
    if (item.roles && item.roles.includes(user.role)) {
      let children = [];
      if (item.children) {
        children = item.children.filter(item1 => {
          if (item1.roles && item1.roles.includes(user.role)) {
            return item1;
          }
          return false;
        });
      }

      if (children.length) {
        item.children = children;
      }

      return item;
    }
    return false;
  });
};
