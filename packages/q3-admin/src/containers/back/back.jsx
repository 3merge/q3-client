import React from 'react';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useBack } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Back = () => (
  <ButtonWithIcon
    icon={KeyboardBackspace}
    role="link"
    label="previous"
    onClick={useBack()}
  />
);

export default Back;
