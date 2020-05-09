import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import useStyles from '../utils/useStyles';

const TablePaper = ({ children }) => {
  const { overflow } = useStyles();
  return <Box className={overflow}>{children}</Box>;
};

TablePaper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TablePaper;
