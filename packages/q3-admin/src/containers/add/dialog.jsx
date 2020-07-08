/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from 'q3-ui-dialog';

const CreateDialog = ({ children, ...props }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      {...props}
      variant="drawer"
      renderContent={children}
      renderTrigger={(onClick) => (
        <Button
          aria-label={t('labels:add')}
          size="small"
          variant="contained"
          elevation={4}
          color="secondary"
          id="app-add-dialog"
          onClick={onClick}
        >
          New
        </Button>
      )}
    />
  );
};

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateDialog;
