import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import useStyle from '../CellAvatar/styles';

const CellChip = ({ children, color }) => {
  const cls = useStyle({
    backgroundColor: color,
  });

  return (
    <Chip
      className={cls.root}
      label={children}
      size="small"
    />
  );
};

CellChip.defaultProps = {
  children: '--',
  color: undefined,
};

CellChip.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

export default CellChip;
