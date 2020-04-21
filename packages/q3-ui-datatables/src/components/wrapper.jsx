import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import useStyles from '../utils/useStyles';

const TablePaper = ({ children, hasSidebar }) => {
  const { overflow } = useStyles({ hasSidebar });
  return <Box className={overflow}>{children}</Box>;
};

TablePaper.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool.isRequired,
};

export default TablePaper;
