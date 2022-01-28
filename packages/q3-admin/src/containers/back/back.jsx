import React from 'react';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { useBack } from '../../hooks';

const Back = () => (
  <ButtonWithIcon
    label="previous"
    icon={KeyboardBackspace}
    onClick={useBack()}
  />
);

export default Back;
