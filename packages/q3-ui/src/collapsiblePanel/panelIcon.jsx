import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningOutlineIcon from '@material-ui/icons/Warning';
import Label from '@material-ui/icons/Label';
import useStyles from './useStyle';

const PanelIcon = ({
  error,
  warning,
  success,
  hasChildren,
}) => {
  const { iconFont } = useStyles({
    error,
    warning,
    success,
  });

  if (!hasChildren) return <Label className={iconFont} />;

  if (error)
    return <ErrorOutlineIcon className={iconFont} />;

  if (warning)
    return <WarningOutlineIcon className={iconFont} />;

  return <ExpandMoreIcon />;
};

PanelIcon.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool,
  // eslint-disable-next-line
  hasChildren: PropTypes.any,
};

PanelIcon.defaultProps = {
  error: false,
  warning: false,
  success: false,
  hasChildren: false,
};

export default PanelIcon;
