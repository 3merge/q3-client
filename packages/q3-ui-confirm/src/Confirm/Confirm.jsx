import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Tooltip,
  Grid,
  Button,
  useTheme,
} from '@material-ui/core';
import Dialog from 'q3-ui-dialog';
import { isFunction } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PanToolIcon from '@material-ui/icons/PanTool';
import { handleSubmit } from '../helpers';

const Confirm = ({
  icon: Icon,
  disabled,
  label,
  service,
  title,
  ButtonComponent,
  ButtonProps,
  IconButtonProps,
  ...props
}) => {
  const { t } = useTranslation('labels');
  const theme = useTheme();

  return (
    <Dialog
      {...props}
      title={title}
      renderTrigger={(onClick) => {
        const buttonLabel = label || title;
        const sharedButtonProps = {
          className: 'q3-confirm',
          disabled,
          onClick,
        };

        if (isFunction(ButtonComponent))
          return <ButtonComponent {...sharedButtonProps} />;

        if (Icon)
          return (
            <Tooltip arrow title={t(buttonLabel)}>
              <IconButton
                aria-label={t(buttonLabel)}
                color="inherit"
                {...sharedButtonProps}
                {...IconButtonProps}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          );

        return (
          <Button
            color="secondary"
            variant="contained"
            {...sharedButtonProps}
            {...ButtonProps}
          >
            {t(buttonLabel)}
          </Button>
        );
      }}
      renderContent={(close) => (
        <Grid container spacing={1}>
          <Grid item>
            <Button
              startIcon={<PanToolIcon />}
              // eslint-disable-next-line
              onClick={props?.onClose || close}
              variant="contained"
            >
              {t('cancel')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              endIcon={<VerifiedUserIcon />}
              style={{
                backgroundColor:
                  theme?.palette?.error?.main,
                color: theme?.palette?.error?.contrastText,
              }}
              onClick={handleSubmit(service, close)}
              variant="contained"
            >
              {t('proceed')}
            </Button>
          </Grid>
        </Grid>
      )}
    />
  );
};

Confirm.defaultProps = {
  icon: null,
  title: 'confirm',
  description: 'confirm',
  disabled: false,
  label: undefined,
  ButtonProps: {},
  IconButtonProps: {},
  ButtonComponent: null,
};

Confirm.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  service: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,

  // eslint-disable-next-line
  ButtonProps: PropTypes.object,
  // eslint-disable-next-line
  IconButtonProps: PropTypes.object,
  ButtonComponent: PropTypes.func,
};

export default Confirm;
