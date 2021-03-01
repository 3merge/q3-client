import React from 'react';
import { Fade, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: `${theme.palette.background.default}`,
    textAlign: 'center',
    width: 355,
  },
}));

const LogoLandscape = () => {
  const cls = useStyle();

  return (
    <Grid item className={cls.root}>
      <Fade in>
        <img
          alt="logo"
          src="https://logoipsum.com/logo/logo-26.svg"
          style={{
            height: '100%',
            maxHeight: 75,
            maxWidth: 155,
            width: '100%',
            marginRight: '3rem',
          }}
        />
      </Fade>
    </Grid>
  );
};

LogoLandscape.defaultProps = {};
LogoLandscape.propTypes = {};

export default LogoLandscape;
