import React from 'react';
import {
  Box,
  Container,
  Fade,
  Hidden,
} from '@material-ui/core';
import Breadcrumbs from '../Breadcrumbs';
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
      <Hidden lgUp>
        <Breadcrumbs />
      </Hidden>
      <Box alignItems="center" display="flex" width="100%">
        {children}
      </Box>
    </Container>
  </Fade>
);

export default Header;
