import React from 'react';
import {
  Box,
  Slide,
  useMediaQuery,
} from '@material-ui/core';
import useStyle from './styles';

// eslint-disable-next-line
const Actionbar = ({ children }) => {
  const cls = useStyle();
  const Wrapper = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  )
    ? Slide
    : Box;

  return (
    <Wrapper in>
      <Box display="flex" className={cls.root}>
        {children}
      </Box>
    </Wrapper>
  );
};

export default Actionbar;
