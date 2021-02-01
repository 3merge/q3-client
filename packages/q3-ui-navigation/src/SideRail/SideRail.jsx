import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fade } from '@material-ui/core';
import Collapsed from '../Collapsed';
import useStyle from './useStyle';

const SideBar = ({ menuItems }) => {
  const cls = useStyle({});

  return (
    <Box className={cls.root}>
      <Box className={cls.container}>
        <Fade in>
          <img
            alt="logo"
            src="https://logoipsum.com/logo/logo-15.svg"
            style={{
              maxWidth: 155,
              width: '100%',
            }}
          />
        </Fade>
        <Collapsed menuItems={menuItems} />
      </Box>
    </Box>
  );
};

SideBar.defaultProps = {};

SideBar.propTypes = {};

export default SideBar;
