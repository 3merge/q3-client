import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useBack } from 'q3-hooked';

const IconButton = () => {
  const { label, onClick } = useBack();

  return (
    <MuiIconButton label={label} onClick={onClick}>
      <ArrowBackIcon />
    </MuiIconButton>
  );
};

export default IconButton;
