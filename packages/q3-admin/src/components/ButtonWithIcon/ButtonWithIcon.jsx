/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ButtonWithIcon = ({ icon: Icon, label, ...rest }) => {
  const { t } = useTranslation('labels');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Button
      style={{ margin: '0 .25rem' }}
      aria-label={t(label)}
      size={matches ? 'medium' : 'small'}
      variant="contained"
      elevation={4}
      {...rest}
    >
      <Icon
        style={{
          marginRight: '.5rem',
          marginLeft: '-.5rem',
        }}
      />
      {t(label)}
    </Button>
  );
};

ButtonWithIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default ButtonWithIcon;
