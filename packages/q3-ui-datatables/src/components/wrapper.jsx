import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import useStyles from '../utils/useStyles';

const TablePaper = ({ children }) => {
  const { overflow } = useStyles();
  return (
    <Grid container className={overflow}>
      {children}
    </Grid>
  );
};

TablePaper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TablePaper;
