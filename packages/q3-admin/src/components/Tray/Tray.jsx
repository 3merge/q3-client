import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import useStyle from './useStyle';
import globalStyles from '../useStyle';

const Tray = ({ children }) => {
  const cls = useStyle();
  const gc = globalStyles();

  return (
    <Box className={classnames(cls.root, gc.appbar)}>
      {children}
    </Box>
  );
};

Tray.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

export default Tray;
