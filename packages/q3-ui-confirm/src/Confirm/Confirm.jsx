import React from 'react';
import PropTypes from 'prop-types';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from 'q3-ui/lib/iconButton';
import Button from '@material-ui/core/Button';
import Dialog from 'q3-ui-dialog';
import { useTranslation } from 'react-i18next';
import ConfirmForm from '../ConfirmForm';
import { handleSubmit } from '../helpers';

const Confirm = ({
  disabled,
  icon,
  label,
  service,
  phrase,
  title,
  ...props
}) => {
  const { t } = useTranslation('labels');

  return (
    <Dialog
      {...props}
      title={title}
      renderTrigger={(onClick) => {
        const buttonProps = {
          className: 'q3-confirm',
          disabled,
          onClick,
        };

        return label ? (
          <Button
            {...buttonProps}
            color="primary"
            variant="contained"
          >
            {t(label)}
          </Button>
        ) : (
          <IconButton
            icon={icon}
            label={t(title)}
            buttonProps={buttonProps}
          />
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
};

export default Confirm;
