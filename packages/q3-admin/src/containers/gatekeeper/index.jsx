import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from 'q3-ui-permissions';

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

  if (
    redirectPathOnPublic &&
    (!Auth.state.profile ||
      (redirectCheck && !redirectCheck(Auth)))
  ) {
    navigate(redirectPathOnPublic);
    return null;
  }

  if (redirectPathOnSession) {
    navigate(redirectPathOnSession);
    return null;
  }

  return children;
};

Gatekeeper.propTypes = {
  redirectPathOnSession: PropTypes.string,
  redirectPathOnPublic: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Gatekeeper.defaultProps = {
  redirectPathOnPublic: '/login',
};

export default Gatekeeper;
