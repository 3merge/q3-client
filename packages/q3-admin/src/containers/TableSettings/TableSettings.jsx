import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from 'q3-ui-dialog';

const TableSettings = () => (
  <Dialog
    title="settings"
    variant="drawer"
    renderContent={() => (
      <>
        <Typography variant="overline">Imports</Typography>
        <br />
        <Typography variant="overline">Exports</Typography>
      </>
    )}
    renderTrigger={(onClick) => (
      <IconButton
        label="settings"
        icon={SettingsIcon}
        buttonProps={{ onClick }}
      />
    )}
  />
);

export default TableSettings;
