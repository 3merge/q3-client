import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import useGlobalStyle from '../useStyle';

const SystemPage = ({ children }) => {
  const globalCls = useGlobalStyle();

  return (
    <Box
      bgcolor="background.paper"
      className={globalCls.fillViewportHeightWithoutAppbar}
      py={2}
    >
      {children}
    </Box>
  );
};

SystemPage.defaultProps = {
  children: null,
};

SystemPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default SystemPage;
