import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import BugReport from '@material-ui/icons/BugReport';
import Help from '@material-ui/icons/Help';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, Paper, Tooltip } from '@material-ui/core';
import Logo from '../logo';
import astronaut from '../../static/astronaut.png';
import Avatar from '../avatar';

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
    borderRight: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    minHeight: '100vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      width: '100%',
    },
  },
  mobile: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
  logo: {
    fill: theme.palette.secondary.main,
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
}));

const ProfileBar = ({
  supportDeskUrl,
  supportDeskLabel,
  docs,
  menuItems,
  name,
  imgSrc,
  companyName,
}) => {
  const { bar, img, relative, mobile, logo } = useStyles();

  const [open, setOpen] = React.useState();

  const openMenu = React.useCallback(({ target }) => {
    setOpen(target);
  }, []);

  const closeMenu = React.useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <Paper className={relative}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={bar}
      >
        <Grid item>
          <Link to="/" aria-label="Home">
            <Box className={logo}>
              <Logo />
            </Box>
          </Link>
          <Typography variant="subtitle2" color="secondary">
            {String(companyName).toUpperCase()}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            className={mobile}
            spacing={1}
          >
            <Grid item>
              {docs && (
                <Tooltip title="Docs">
                  <IconButton
                    size="small"
                    color="inherit"
                    component="a"
                    href={docs}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Help />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              {supportDeskLabel && (
                <Tooltip title={supportDeskLabel}>
                  <IconButton
                    size="small"
                    color="inherit"
                    component="a"
                    href={supportDeskUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <BugReport />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            {name && (
              <Grid item>
                <Box my={1}>
                  <IconButton
                    size="small"
                    onClick={openMenu}
                  >
                    <Avatar
                      word={name}
                      className={img}
                      imgSrc={imgSrc}
                    />
                  </IconButton>
                </Box>
              </Grid>
            )}
            <Menu
              id="profile-menu"
              anchorEl={open}
              open={Boolean(open)}
              keepMounted
              onClose={closeMenu}
            >
              {menuItems.map((item) => (
                <MenuItem
                  dense
                  key={item.label}
                  onClick={item.onClick}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const profileBarProps = {
  companyName: PropTypes.string,
  name: PropTypes.string,
  supportDeskUrl: PropTypes.string,
  imgSrc: PropTypes.string,
  supportDeskLabel: PropTypes.string,
  docs: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

ProfileBar.propTypes = profileBarProps;

ProfileBar.defaultProps = {
  companyName: '3merge',
  supportDeskLabel: 'Support desk',
  imgSrc: astronaut,
  name: null,
  supportDeskUrl: null,
  docs: null,
  menuItems: [],
};

export default ProfileBar;
