import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import composeUseAuth, {
  asProtectedRoute,
} from './useAuth';
import AuthenticationHeaders from './utils/header';
import reducer, {
  destroySession,
  getSession,
  setSession,
} from './reducer';
import { RESET } from './utils/constants';
import { invoke } from './utils/helpers';

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

export const Provider = ({
  renderPublic,
  renderPrivate,
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    profile: {},
    permissions: [],
  });

  const invokeRendererFns = () => {
    if (!state || !state.init) return null;
    return state.profile
      ? invoke(renderPrivate, state.profile)
      : invoke(renderPublic);
  };

  const refresh = () => {
    dispatch({ type: RESET });
    getSession(dispatch);
  };

  React.useEffect(() => {
    Axios.interceptors.request.use((config) => {
      const cls = new AuthenticationHeaders(config);
      cls.headers = cls.tokens;
      return cls.config;
    });

    getSession(dispatch);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        refresh,
      }}
    >
      {invokeRendererFns()}
      {children}
    </AuthContext.Provider>
  );
};

Provider.propTypes = {
  /**
   * Render-blocking public components.
   */

  renderPublic: PropTypes.func.isRequired,
  /**
   * Render-blocking private (session-required) components.
   * This component renderer recieves the profile state as props.
   */
  renderPrivate: PropTypes.func.isRequired,

  /**
   * Will render regardless of authentication state.
   */
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
