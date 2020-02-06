import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Grid, Paper } from '@material-ui/core';
import astronaut from '../../images/astronaut.png';
import Offcanvas from '../offcanvas';
import { AccountMenu } from '../toolbar';
import Logo from '../logo';

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
    borderRight: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    minHeight: '100vh',
    padding: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      backgroundColor: theme.palette.primary.main,
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
    minWidth: 72,
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
    width: 64,
    height: 64,
    position: 'relative',
    '&>svg': {
      width: '100%',
      height: '100%',
      transform: 'scale(1.5)',
    },
  },
  logoText: {
    color: '#FFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em',
    },
  },
  showOnHover: {
    '& #logo-text': {
      opacity: 0,
      transitionProperty: 'opacity, transform',
      transitionDuration: '250ms',
      transform: 'translateX(-10px)',
    },
    '&:hover #logo-text': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
}));

export const LogoHomeLink = ({ name }) => {
  const { logo, logoText, showOnHover } = useStyles();

  return (
    <Link to="/" aria-label={name} className={logoText}>
      <Grid
        container
        alignItems="center"
        className={showOnHover}
      >
        <Grid item>
          <Box ml={1} className={logo}>
            <Logo />
          </Box>
        </Grid>
        <Grid item>
          <Typography
            id="logo-text"
            variant="h1"
            style={{ textTransform: 'uppercase' }}
          >
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

const ProfileBar = ({
  offcanvas: MobileMenu,
  menuItems,
  quickClickItems,
  name,
  imgSrc,
  ...rest
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
                  {...rest}
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
  quickClickItems: PropTypes.arrayOf(PropTypes.node),
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
  quickClickItems: [],
};

export default ProfileBar;
