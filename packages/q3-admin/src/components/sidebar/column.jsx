import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';
import useHeight from './useHeight';
import Drawer from './drawer';

const Column = ({ children }) => {
  const height = useHeight();
  const { columnWidth } = useStyle({ height });

  return (
    <Box id="q3-sidebar">
      <Drawer>{children}</Drawer>
      <Grid item className={columnWidth}>
        {children}
      </Grid>
    </Box>
  );
};

Column.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Column;
