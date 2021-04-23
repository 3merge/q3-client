import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import Tooltip from '../tooltip';

const AccessibleIconButton = ({
  icon: Icon,
  label,
  buttonProps,
  iconProps,
  badgeContent,
}) => {
  const { t } = useTranslation('labels');

  return (
    <Tooltip title={t(label)} arrow>
      <IconButton
        {...buttonProps}
        aria-label={t(label)}
        color="inherit"
      >
        {badgeContent ? (
          <Badge
            color="secondary"
            variant={badgeContent ? 'standard' : 'dot'}
            badgeContent={badgeContent}
          >
            <Icon {...iconProps} />
          </Badge>
        ) : (
          <Icon {...iconProps} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export const IconButtonWithLoading = ({
  loading,
  ...rest
}) => {
  if (loading)
    Object.assign(rest.buttonProps, {
      'aria-busy': true,
      disabled: true,
    });

  return (
    <Box position="relative" display="inline-block">
      <AccessibleIconButton {...rest} />
      <Fade in={loading}>
        <CircularProgress
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
          }}
        />
      </Fade>
    </Box>
  );
};

AccessibleIconButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  buttonProps: PropTypes.shape({
    onClick: PropTypes.func,
    type: PropTypes.string,
  }),
  badgeContent: PropTypes.number,
};

AccessibleIconButton.defaultProps = {
  buttonProps: {},
  badgeContent: 0,
};

IconButtonWithLoading.propTypes = {
  loading: PropTypes.bool,
};

IconButtonWithLoading.defaultProps = {
  loading: false,
};

export default AccessibleIconButton;
