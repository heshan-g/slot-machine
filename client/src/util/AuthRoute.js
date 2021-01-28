import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/game' /> : <Component {...props} />
      }
    />
  );
};

const NotAuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export { AuthRoute, NotAuthRoute };
