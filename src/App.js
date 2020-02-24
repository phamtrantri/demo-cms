import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from 'layouts/Admin.js';

// config store
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';
import CustomAlert from 'components/CustomAlert/CustomAlert';

import { emitter } from './emitter';
import { getItem } from 'utils/storage';
import { decryptNakedToSystem } from 'utils/crypto';
import { auth } from 'reducers';
import { client, accountClient } from 'services';

// special view
import Login from 'views/Login/Login';
import ForgotPassword from 'views/ForgotPassword/ForgotPassword';
import ResetPassword from 'views/ResetPassword/ResetPassword';

export default function App() {
  const alertRef = React.createRef();

  React.useEffect(() => {
    emitter.addListener('alert', params => {
      alertRef.current.show(params);
    });
    return () => {
      emitter.removeListener('alert', params => {
        alertRef.current.show(params);
      });
    };
  }, []);

  const logout = () => {
    store.dispatch({
      type: auth.types.SIGN_OUT
    });
  };

  React.useEffect(() => {
    try {
      const encryptedData = getItem('token');
      if (encryptedData) {
        const decryptedData = decryptNakedToSystem(encryptedData);
        if (decryptedData) {
          const { token, account_detail } = JSON.parse(decryptedData);

          client.setHeader('Authorization', `Bearer ${token}`);
          accountClient.setHeader('Authorization', `Bearer ${token}`);

          store.dispatch({
            type: auth.types.SIGN_IN_SUCCEEDED,
            payload: { token, account_detail }
          });
        } else {
          logout();
        }
      }
    } catch (error) {
      logout();
    }
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/admin/authorization/login" component={Login} />
              <Route
                path="/admin/authorization/recover"
                component={ForgotPassword}
              />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/admin" component={Admin} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>

            <CustomAlert ref={alertRef} />
          </React.Suspense>
        </Router>
      </ConnectedRouter>
    </Provider>
  );
}
