import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyle from './useStyle';

const Scrollbar = ({ columns, className, getWidth }) => {
  const { root, headerCell, snap } = useStyle();

  return (
    <Box id="q3-datatable-scroller" className={root}>
      <Box className={classnames(snap, headerCell)} />
      {columns.map((column) => (
        <Box
          key={column}
          className={classnames(snap, className)}
          style={getWidth(column)}
        />
      ))}
    </Box>
  );
};

Scrollbar.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
};

export default Scrollbar;
