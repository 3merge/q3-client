import React from 'react';
import { Fade, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const LogoLandscape = () => (
  <Grid item>
    <Fade in>
      <img
        alt="logo"
        src="https://logoipsum.com/logo/logo-26.svg"
        style={{
          height: '100%',
          maxWidth: 155,
          width: '100%',
        }}
      />
    </Fade>
  </Grid>
);

LogoLandscape.defaultProps = {};
LogoLandscape.propTypes = {};

export default LogoLandscape;
