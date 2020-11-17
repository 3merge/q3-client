import React from 'react';
import { IconButton } from '@material-ui/core';
import Search from '@material-ui/icons';
import Dialog from 'q3-ui-dialog';

const Fullscreen = () => {
  return (
    <Dialog
      renderContent={() => <p>s</p>}
      renderTrigger={(open) => (
        <IconButton onClick={open}>
          <Search />
        </IconButton>
      )}
    />
  );
};

export default Fullscreen;
