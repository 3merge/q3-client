import React from 'react';
import Image from 'gatsby-image';
import { Fade, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { compact, size } from 'lodash';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      props.muted
        ? theme.palette.background.default
        : theme.palette.background.paper,
    textAlign: 'center',
    maxWidth: 355,
    minWidth: 310,
    transition: 'background 350ms ease-out !important',
    width: '27.5vw',
  },
}));

const LogoLandscape = () => {
  const cls = useStyle({
    muted: true,
    // muted:
    //   size(compact(useLocation().pathname.split('/'))) < 2,
  });

  return (
    <Grid item className={cls.root}>
      <Image
        alt="logo"
        fluid={{
          src: 'https://logoipsum.com/logo/logo-26.svg',
        }}
        imgStyle={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        style={{
          height: 75,
          width: '100%',
          marginRight: '3rem',
        }}
      />
    </Grid>
  );
};

LogoLandscape.defaultProps = {};
LogoLandscape.propTypes = {};

export default LogoLandscape;
