import React from 'react';
import PropTypes from 'prop-types';
import LaunchIcon from '@material-ui/icons/Launch';
import { IconButton, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from 'q3-ui-dialog';
import { isFunction } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import ConfirmForm from '../ConfirmForm';
import { handleSubmit } from '../helpers';

const Confirm = ({
  icon: Icon,
  disabled,
  label,
  service,
  phrase,
  title,
  ButtonComponent,
  ButtonProps,
  IconButtonProps,
  ...props
}) => {
  const { t } = useTranslation('labels');

  return (
    <Dialog
      {...props}
      title={title}
      renderTrigger={(onClick) => {
        const sharedButtonProps = {
          className: 'q3-confirm',
          disabled,
          onClick,
        };

        if (isFunction(ButtonComponent))
          return <ButtonComponent {...sharedButtonProps} />;

        return label ? (
          <Button
            color="secondary"
            variant="contained"
            {...sharedButtonProps}
            {...ButtonProps}
          >
            {t(label)}
          </Button>
        ) : (
          <Tooltip arrow title={t(title)}>
            <IconButton
              aria-label={t(title)}
              color="inherit"
              {...sharedButtonProps}
              {...IconButtonProps}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        );
      }}
      renderContent={(close) => (
        <ConfirmForm
          onSubmit={handleSubmit(service, close)}
          phrase={phrase}
        />
      )}
    />
  );
};

Confirm.defaultProps = {
  icon: LaunchIcon,
  title: 'confirm',
  description: 'confirm',
  disabled: false,
  label: undefined,
  phrase: 'confirm',
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
  phrase: PropTypes.string,
  // eslint-disable-next-line
  ButtonProps: PropTypes.object,
  // eslint-disable-next-line
  IconButtonProps: PropTypes.object,
  ButtonComponent: PropTypes.func,
};

export default Confirm;
