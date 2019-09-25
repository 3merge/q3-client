import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextField } from '@material-ui/core';
import Docs from './README.md';
import { Create, Delete } from '.';

storiesOf('Components|Dialogs', module)
  .addParameters({
    jest: ['dialogs'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Delete Confirmation', () => (
    <Delete next={() => Promise.resolve()} />
  ))
  .add('Create Fullscreen', () => (
    <Create
      title="Add new"
      instructions="This is some information about what you're about to create."
      render={() => (
        <>
          <TextField
            name="name"
            label="First name"
            margin="dense"
            fullWidth
          />
          <TextField
            name="surname"
            label="Last name"
            margin="dense"
            fullWidth
          />
        </>
      )}
    />
  ));
