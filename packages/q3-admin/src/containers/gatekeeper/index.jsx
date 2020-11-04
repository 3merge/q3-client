import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AuthContext,
  destroySession,
} from 'q3-ui-permissions';
import { object } from 'q3-ui-helpers';

export const Gatekeeper = ({
  redirectCheck,
  redirectPathOnSession,
  redirectPathOnPublic,
  children,
}) => {
  const Auth = React.useContext(AuthContext);

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
    navigate(redirectPathOnPublic);
    return null;
  }

  if (Auth.state.profile && redirectPathOnSession) {
    navigate(redirectPathOnSession);
    return null;
  }

  if (typeof redirectStr === 'string') {
    console.log(redirectStr);
    console.log(destroySession);
    destroySession(redirectStr);
    return null;
  }

  return children;
};

Gatekeeper.propTypes = {
  redirectPathOnSession: PropTypes.string,
  redirectPathOnPublic: PropTypes.string,
  children: PropTypes.node,
};

Gatekeeper.defaultProps = {
  children: null,
};

export default Gatekeeper;
