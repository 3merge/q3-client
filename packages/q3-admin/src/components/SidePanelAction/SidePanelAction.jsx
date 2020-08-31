import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

const SidePanelAction = ({
  description,
  label,
  onClick,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography style={{ fontSize: '.877rem' }}>
        {t(`descriptions:${description}`)}
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        size="small"
        onClick={onClick}
        {...rest}
      >
        {t(`labels:${label}`)}
      </Button>
    </>
  );
};

SidePanelAction.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidePanelAction;
