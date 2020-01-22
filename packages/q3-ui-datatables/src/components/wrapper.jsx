import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import useStyles from '../utils/useStyles';

const TablePaper = ({ children }) => {
  const { overflow } = useStyles();
  return (
    <Paper elevation={0} className={overflow}>
      {children}
    </Paper>
  );
};

TablePaper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TablePaper;
