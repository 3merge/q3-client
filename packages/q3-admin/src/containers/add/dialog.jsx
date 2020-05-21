/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from 'q3-ui-dialog';

const CreateDialog = ({ children, ...props }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      {...props}
      variant="drawer"
      renderContent={children}
      renderTrigger={(open) => (
        <Button
          aria-label={t('labels:add')}
          size="small"
          variant="contained"
          elevation={4}
          color="secondary"
          id="app-add-dialog"
          onClick={open}
        >
          <AddIcon /> Add new
        </Button>
      )}
    />
  );
};

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateDialog;
