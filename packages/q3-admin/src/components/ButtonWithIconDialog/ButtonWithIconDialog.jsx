import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import ButtonWithIcon from '../ButtonWithIcon';

export const ButtonWithIconDialog = ({
  renderContent,
  label,
  icon,
  ...rest
}) => (
  <Dialog
    renderContent={renderContent}
    renderTrigger={(onClick) => (
      <ButtonWithIcon
        label={label}
        icon={icon}
        onClick={onClick}
        {...rest}
      />
    )}
    title={label}
    variant="drawer"
  />
);

ButtonWithIconDialog.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  renderContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
};

export default ButtonWithIconDialog;
