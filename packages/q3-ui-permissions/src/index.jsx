import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { browser } from 'q3-ui-helpers';
import { first } from 'lodash';
import composeUseAuth, {
  asProtectedRoute,
} from './useAuth';
import AuthenticationHeaders from './utils/header';
import reducer, {
  destroySession,
  getSession,
  setSession,
} from './reducer';
import { RESET, UPDATE } from './utils/constants';

export const AuthContext = React.createContext({
  state: { init: false },
});

export const useAuth = composeUseAuth(AuthContext);
export const Protected = asProtectedRoute(AuthContext);
export { destroySession, setSession };

export const isLoggedIn = () => {
  const a = React.useContext(AuthContext);
  return a && a.state && a.state.profile;
};

export const useProfileLang = () =>
  first(
    String(
      React.useContext(AuthContext)?.state?.profile?.lang ||
        'en',
    ).split('-'),
  );

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    profile: {},
    permissions: [],
  });

  const refresh = () => {
    dispatch({ type: RESET });
    getSession(dispatch);
  };

  const update = (values, done) =>
    Axios.post('/profile', values)
      .then(({ data }) => {
        dispatch({
          type: UPDATE,
          data: {
            ...state,
            ...data,
          },
        });
      })
      .then(done);

  React.useEffect(() => {
    Axios.interceptors.request.use((config) => {
      const cls = new AuthenticationHeaders(config);
      cls.headers = cls.tokens;
      return cls.config;
    });

    getSession(dispatch);
  }, []);

  React.useEffect(() => {
    browser.proxyLocalStorageApi(
      'setItem',
      'q3-userId',
      state?.profile?.id,
    );
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        refresh,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
