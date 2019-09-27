import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Grid, Paper } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import astronaut from '../../static/astronaut.png';
import Offcanvas from '../offcanvas';
import { AccountMenu } from '../toolbar';
import Logo from '../logo';

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
    borderRight: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    minHeight: '100vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      backgroundColor: blueGrey[900],
      boxShadow: theme.shadows[1],
      minHeight: 'auto',
      flexDirection: 'row',
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  img: {
    backgroundColor: '#FFF',
    border: '2px solid #FFF',
    borderRadius: '50%',
    height: '2em',
    width: '2em',
  },
  relative: {
    display: 'inline-block',
    minWidth: 85,
    position: 'relative',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100%',
    },
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  logo: {
    fill: '#FFF',
    width: 32,
    height: 32,
    margin: '1rem auto 0.5rem',
    position: 'relative',
    '&>svg': {
      height: 72,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      width: 72,
    },
  },
  logoText: {
    color: '#FFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
    },
  },
}));

const ProfileBar = ({
  offcanvas: MobileMenu,
  menuItems,
  name,
  imgSrc,
}) => {
  const {
    bar,
    relative,
    mobile,
    logo,
    logoText,
  } = useStyles();

  return (
    <Paper className={relative}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={bar}
      >
        <Hidden smDown>
          <Grid item>
            <Link
              to="/"
              aria-label={name}
              className={logoText}
            >
              <Box className={logo}>
                <Logo />
              </Box>
            </Link>
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            className={mobile}
            spacing={1}
          >
            <Grid item>
              <Offcanvas left menu={MobileMenu}>
                {(toggle) => (
                  <Hidden mdUp>
                    <Grid container align="center">
                      <IconButton
                        aria-label="Open menu"
                        onClick={toggle}
                        size="small"
                        color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                  </Hidden>
                )}
              </Offcanvas>
            </Grid>
            <Grid item>
              <Box my={1}>
                <AccountMenu
                  profileImgSrc={imgSrc}
                  items={menuItems}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const profileBarProps = {
  name: PropTypes.string,
  imgSrc: PropTypes.string,
  offcanvas: PropTypes.node.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

ProfileBar.propTypes = profileBarProps;

ProfileBar.defaultProps = {
  imgSrc: astronaut,
  name: null,
  menuItems: [],
};

export default ProfileBar;
