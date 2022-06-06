import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { breakdownColourPaletteBySeverity } from '../utils';
import useStyle from './styles';

const StatusIndicator = ({ label, severity }) => {
  const cls = useStyle(
    breakdownColourPaletteBySeverity(severity),
  );

  return (
    <Typography
      className={cls.root}
      color="inherit"
      component="span"
    >
      <Box className={cls.dot} />
      {label}
    </Typography>
  );
};

StatusIndicator.defaultProps = {
  severity: 0,
};

StatusIndicator.propTypes = {
  label: PropTypes.string.isRequired,
  severity: PropTypes.number,
};

export default StatusIndicator;
