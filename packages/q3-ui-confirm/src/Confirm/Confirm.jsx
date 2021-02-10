import React from 'react';
import PropTypes from 'prop-types';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import ConfirmForm from '../ConfirmForm';
import { handleSubmit } from '../helpers';

const Confirm = ({ icon, service, title, ...props }) => (
  <Dialog
    {...props}
    title={title}
    renderTrigger={(onClick) => (
      <IconButton
        icon={icon}
        label="delete"
        buttonProps={{
          className: 'q3-confirm',
          onClick,
        }}
      />
    )}
    renderContent={(close) => (
      <ConfirmForm
        onSubmit={handleSubmit(service, close)}
        phrase={title}
      />
    )}
  />
);

Confirm.defaultProps = {
  icon: LaunchIcon,
  title: 'confirm',
  description: 'confirm',
};

Confirm.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  service: PropTypes.func.isRequired,
};

export default Confirm;
