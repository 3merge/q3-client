import './config/axios';
import React from 'react';
import PropTypes from 'prop-types';
import reducer, {
  getSession,
  authenticate,
  destroySession,
} from './utils/reducer';
import composePermissionHook from './utils/permissions';

export { authenticate, destroySession };
export const AuthContext = React.createContext();
export const usePermission = composePermissionHook(
  AuthContext,
);

export const Provider = ({
  renderPublic,
  renderPrivate,
  loading: Loading,
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
      {state.profile ? renderPrivate() : renderPublic()}
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
      <Loading />
    </div>
  );
};

Provider.propTypes = {
  renderPublic: PropTypes.func.isRequired,
  renderPrivate: PropTypes.func.isRequired,
  loading: PropTypes.node.isRequired,
};

export default Provider;
