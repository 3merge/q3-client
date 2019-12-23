import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const AccessibleIconButton = ({
  icon: Icon,
  label,
  buttonProps,
}) => {
  const { t } = useTranslation('labels');

  return (
    <Tooltip title={t(label)}>
      <IconButton {...buttonProps} color="inherit">
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

AccessibleIconButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  buttonProps: PropTypes.shape({
    onClick: PropTypes.func,
    type: PropTypes.string,
  }),
};

AccessibleIconButton.defaultProps = {
  buttonProps: {},
};

export default AccessibleIconButton;
