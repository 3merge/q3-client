import React from 'react';
import { Box } from '@material-ui/core';
import useStyle from './styles';

// eslint-disable-next-line
const Actionbar = ({ children }) => {
  const cls = useStyle();

  return (
    <Box display="flex" className={cls.root}>
      {children}
    </Box>
  );
};

export default Actionbar;
