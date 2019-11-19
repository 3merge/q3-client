import './config/axios';
import React from 'react';
import PropTypes from 'prop-types';
import composePermissionHook, {
  asProtectedRoute,
} from './utils/permissions';
import reducer, { getSession } from './utils/reducer';

export * from './utils/reducer';
export const AuthContext = React.createContext();
export const useAuth = composePermissionHook(AuthContext);
export const Protected = asProtectedRoute(AuthContext);

const invoke = (fn, args) =>
  typeof fn === 'function' ? fn(args) : null;

export const isLoggedIn = () => {
  const a = React.useContext(AuthContext);
  return a && a.state && a.state.profile;
};

export const Provider = ({
  renderPublic,
  renderPrivate,
  loading: Loading,
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    profile: {},
    permissions: [],
  });

  React.useEffect(() => {
    getSession(dispatch);
  }, []);

  return state.init ? (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.profile
        ? invoke(renderPrivate, state.profile)
        : invoke(renderPublic)}
      {children}
    </AuthContext.Provider>
  ) : (
    <div
      style={{
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      {Loading ? <Loading /> : 'Please wait...'}
    </div>
  );
};

Provider.propTypes = {
  renderPublic: PropTypes.func.isRequired,
  renderPrivate: PropTypes.func.isRequired,
  loading: PropTypes.node.isRequired,
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
