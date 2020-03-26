import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';
import useHeight from './useHeight';
import Drawer from './drawer';

const Column = ({ children }) => {
  const height = useHeight();
  const { columnWidth } = useStyle({ height });

  return (
    <>
      <Drawer>{children}</Drawer>
      <Grid item className={columnWidth}>
        {children}
      </Grid>
    </>
  );
};

Column.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Column;
