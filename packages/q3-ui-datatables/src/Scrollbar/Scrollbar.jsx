import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyle from './useStyle';

const Scrollbar = ({ columns, width }) => {
  const { root, headerCell, snap, fixedCell } = useStyle({
    width,
  });

  return (
    <Box className={root}>
      <Box className={classnames(snap, headerCell)} />
      {columns.map((column) => (
        <Box
          key={column}
          className={classnames(snap, fixedCell)}
        />
      ))}
    </Box>
  );
};

Scrollbar.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
};

export default Scrollbar;
