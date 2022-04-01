import React from 'react';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import { useBack } from '../../hooks';

const Back = () => (
  <IconButton
    role="link"
    label="previous"
    onClick={useBack()}
  >
    <KeyboardBackspace />
  </IconButton>
);

export default Back;
