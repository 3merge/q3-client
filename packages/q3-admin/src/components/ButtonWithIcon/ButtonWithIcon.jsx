/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from 'q3-ui/lib/iconButton';
import Hidden from '@material-ui/core/Hidden';

const ButtonWithIcon = ({ icon: Icon, label, ...rest }) => {
  const { t } = useTranslation('labels');

  return (
    <Box display="inline">
      <Hidden smDown implementation="css">
        <Button
          style={{ margin: '0 .25rem' }}
          aria-label={t(label)}
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
      </Hidden>
      <Hidden mdUp implementation="css">
        <IconButton
          label={label}
          icon={Icon}
          buttonProps={rest}
        />
      </Hidden>
    </Box>
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
