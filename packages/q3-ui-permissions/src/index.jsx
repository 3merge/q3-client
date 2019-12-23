import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import composeUseAuth, {
  asProtectedRoute,
} from './useAuth';
import AuthenticationHeaders from './utils/header';
import reducer, {
  getSession,
  destroySession,
} from './reducer';

export const AuthContext = React.createContext();
export const useAuth = composeUseAuth(AuthContext);
export const Protected = asProtectedRoute(AuthContext);
export { destroySession };

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

  React.useEffect(() => {
    Axios.interceptors.request.use((config) => {
      const cls = new AuthenticationHeaders(config);
      cls.headers = cls.tokens;
      return cls.config;
    });

    getSession(dispatch);
  }, []);

  return state.init ? (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.profile
        ? invoke(renderPrivate, state.profile)
        : invoke(renderPublic)}
      {children}
    </AuthContext.Provider>
  ) : null;
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
