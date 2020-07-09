/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import AddIcon from '@material-ui/icons/Add';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const CreateDialog = ({ children, ...props }) => (
  <Dialog
    {...props}
    variant="drawer"
    renderContent={children}
    renderTrigger={(onClick) => (
      <ButtonWithIcon
        label="new"
        icon={AddIcon}
        color="secondary"
        onClick={onClick}
      />
    )}
  />
);

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateDialog;
