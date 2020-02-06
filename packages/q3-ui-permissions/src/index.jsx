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

export const AuthContext = React.createContext();
export const useAuth = composeUseAuth(AuthContext);
export const Protected = asProtectedRoute(AuthContext);
export { destroySession, setSession };

const invoke = (fn, args) =>
  typeof fn === 'function' ? fn(args) : null;

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
    if (state.init) return null;
    return state.profile
      ? invoke(renderPrivate, state.profile)
      : invoke(renderPublic);
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
    <AuthContext.Provider value={{ state, dispatch }}>
      {invokeRendererFns()}
      {children}
    </AuthContext.Provider>
  );
};

Provider.propTypes = {
  renderPublic: PropTypes.func.isRequired,
  renderPrivate: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
