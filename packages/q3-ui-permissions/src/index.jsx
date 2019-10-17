import './config/axios';
import React from 'react';
import { invoke } from 'lodash';
import PropTypes from 'prop-types';
import reducer, {
  getSession,
  authenticate,
  destroySession,
} from './utils/reducer';
import composePermissionHook from './utils/permissions';

export { authenticate, destroySession };
export const AuthContext = React.createContext();
export const useAuth = composePermissionHook(AuthContext);

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
        ? invoke(renderPrivate)
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
