import React from 'react';
import PropTypes from 'prop-types';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from 'q3-ui-dialog';
import { useTranslation } from 'react-i18next';
import ConfirmForm from '../ConfirmForm';
import { handleSubmit } from '../helpers';

const Confirm = ({
  icon: Icon,
  disabled,
  label,
  service,
  phrase,
  title,
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

        return label ? (
          <Button
            color="primary"
            variant="contained"
            {...sharedButtonProps}
            {...ButtonProps}
          >
            {t(label)}
          </Button>
        ) : (
          <IconButton
            aria-label={t(title)}
            {...sharedButtonProps}
            {...IconButtonProps}
          >
            <Icon />
          </IconButton>
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
};

export default Confirm;
