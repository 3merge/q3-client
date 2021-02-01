import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Fade,
  Grid,
  IconButton,
} from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useToggle } from 'useful-state';
import Vertical from '../Vertical';
import useStyle from './useStyle';

const SideBar = ({ menuItems }) => {
  const { state, toggle } = useToggle(true);

  const cls = useStyle({
    isOpen: state,
  });

  return (
    <Box className={cls.root}>
      <Box className={cls.container}>
        <Box className={cls.wrap}>
          <Fade in>
            <img
              alt="logo"
              src="https://logoipsum.com/logo/logo-26.svg"
              style={{
                maxWidth: 155,
                width: '100%',
              }}
            />
          </Fade>
          <Vertical menuItems={menuItems} />
        </Box>
      </Box>
      <IconButton className={cls.button} onClick={toggle}>
        <MenuOpenIcon />
      </IconButton>
    </Box>
  );
};

SideBar.defaultProps = {};

SideBar.propTypes = {};

export default SideBar;
