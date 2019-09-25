import './lib/axios';
import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import reducer, {
  getSession,
  authenticate,
  destroySession,
} from './utils/reducer';
import composePermissionHook, {
  isVisible,
} from './utils/withPermission';

export { authenticate, destroySession, isVisible };
export const AuthContext = React.createContext();
export const usePermission = composePermissionHook(
  AuthContext,
);
export const usePermissionChecker = isVisible(AuthContext);

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
};

export default Provider;
export { Axios };
