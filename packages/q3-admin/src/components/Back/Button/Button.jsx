import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useBack } from 'q3-hooked';

const Button = () => {
  const { label, onClick } = useBack();

  return (
    <MuiButton onClick={onClick}>
      <ArrowBackIcon style={{ marginRight: '.5rem' }} />
      {label}
    </MuiButton>
  );
};

export default Button;
