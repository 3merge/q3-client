import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGatekeeper } from 'q3-hooked';

export const Gatekeeper = ({
  redirectCheck,
  redirectPathOnSession,
  redirectPathOnPublic,
  children,
}) => {
  const isLoading = useGatekeeper({
    redirectCheck,
    redirectPathOnSession,
    redirectPathOnPublic,
  });

  if (isLoading)
    return (
      <Box align="center" p={6}>
        <CircularProgress />
      </Box>
    );

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
