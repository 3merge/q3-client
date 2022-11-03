import React from 'react';
import { Container, Fade } from '@material-ui/core';
import useStyle from './styles';

// eslint-disable-next-line
const Header = ({ children }) => (
  <Fade in>
    <Container
      className={useStyle().root}
      component="header"
      id="collection-header"
      maxWidth="xl"
    >
      {children}
    </Container>
  </Fade>
);

export default Header;
