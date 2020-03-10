import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningOutlineIcon from '@material-ui/icons/Warning';
import useStyles from './useStyle';

const PanelIcon = ({ error, warning }) => {
  const { iconFont } = useStyles({ error, warning });

  if (error)
    return <ErrorOutlineIcon className={iconFont} />;

  if (warning)
    return <WarningOutlineIcon className={iconFont} />;

  return <ExpandMoreIcon />;
};

PanelIcon.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
};

PanelIcon.defaultProps = {
  error: false,
  warning: false,
};

export default PanelIcon;
