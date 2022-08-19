import React from 'react';
import PropTypes from 'prop-types';
import { Box, Hidden } from '@material-ui/core';
import Logo from '../Logo';
import MobileMenuButton from '../MobileMenuButton';
import useStyle from './styles';

const MobileAppBar = ({ onClick }) => {
  const cls = useStyle();

  return (
    <Hidden lgUp>
      <Box
        component="nav"
        className={cls.root}
        id="app-navbar"
      >
        <MobileMenuButton onClick={onClick} />
        <Logo />
      </Box>
    </Hidden>
  );
};

MobileAppBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MobileAppBar;
