import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const inlineButtonStyles = {
  textDecoration: 'underline',
  padding: 0,
  minWidth: 'auto',
  marginRight: '.5rem',
  textTransform: 'none',
  fontWeight: 'bold',
};

const InlineButton = ({ icon: Icon, label, onClick }) => {
  const { t } = useTranslation('labels');

  return (
    <Button
      aria-label={label}
      onClick={onClick}
      size="small"
      style={inlineButtonStyles}
    >
      {Icon && <Icon style={{ marginRight: '.5rem' }} />}
      {t(label)}
    </Button>
  );
};

InlineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  // eslint-disable-next-line
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default InlineButton;
