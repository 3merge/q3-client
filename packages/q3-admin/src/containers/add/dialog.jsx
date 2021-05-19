/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import AddIcon from '@material-ui/icons/Add';
import useActionBar from '../../hooks/useActionBar';

const CreateDialog = ({ children, ...props }) => (
  <Dialog
    {...props}
    variant="drawer"
    renderContent={children}
    renderTrigger={(onClick) => {
      useActionBar({
        color: 'secondary',
        icon: AddIcon,
        label: 'add',
        sort: 4,
        onClick,
      });

      return null;
    }}
  />
);

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateDialog;
