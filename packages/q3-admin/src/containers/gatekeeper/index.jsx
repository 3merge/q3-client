import React from 'react';
import PropTypes from 'prop-types';
import {
  navigate as globalReachNavigate,
  useLocation,
} from '@reach/router';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AuthContext,
  destroySession,
} from 'q3-ui-permissions';
import { object } from 'q3-ui-helpers';

export const Gatekeeper = ({
  navigate,
  redirectCheck,
  redirectPathOnSession,
  redirectPathOnPublic,
  children,
}) => {
  const Auth = React.useContext(AuthContext);
  const l = useLocation();

  if (!Auth.state.init)
    return (
      <Box align="center" p={6}>
        <CircularProgress />
      </Box>
    );

  const redirectStr = object.invokeSafely(
    redirectCheck,
    Auth.state.profile,
  );

  if (redirectPathOnPublic && !Auth.state.profile) {
    navigate(redirectPathOnPublic, {
      state: {
        gatekeeper: l.pathname,
      },
    });

    return null;
  }

  if (Auth.state.profile && redirectPathOnSession) {
    navigate(redirectPathOnSession);
    return null;
  }

  if (typeof redirectStr === 'string') {
    destroySession(redirectStr);
    return null;
  }

  return children;
};

Gatekeeper.propTypes = {
  navigate: PropTypes.func,
  redirectPathOnSession: PropTypes.string,
  redirectPathOnPublic: PropTypes.string,
  children: PropTypes.node,
};

Gatekeeper.defaultProps = {
  navigate: globalReachNavigate,
  children: null,
};

export default Gatekeeper;
