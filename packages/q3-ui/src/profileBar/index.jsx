import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { useToggle } from 'useful-state';
import Grid from '@material-ui/core/Grid';
import SwapHoriz from '@material-ui/icons/KeyboardArrowLeft';
import Close from '@material-ui/icons/KeyboardArrowRight';
import { AccountMenu } from '../toolbar';
import astronaut from '../../images/astronaut.png';
import Logo from '../logo';
import DarkMode from '../darkMode';
import useStyles from './useStyle';

export const getIcon = (v) =>
  v ? <Close /> : <SwapHoriz />;

const ProfileBar = ({ companyName, children, ...rest }) => {
  const { toggle, state, close, open } = useToggle();
  const isOpen = !state;
  const { colourful } = useStyles({ isOpen });

  return (
    <Hidden smDown implementation="css">
      <DarkMode>
        <Box width={80} height="100vh" position="relative">
          <Box
            height="100%"
            component="aside"
            width={state ? 250 : 80}
            aria-expanded={isOpen}
            className={colourful}
            onFocus={open}
            onBlur={close}
            onMouseOver={open}
            onMouseLeave={close}
            tabIndex={0}
            onKeyPress={toggle}
          >
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ height: '100%', width: 250 }}
            >
              <Grid item>
                <Logo name={companyName} />
                {children}
              </Grid>
              <Grid item>
                <Box my={1} p={2}>
                  <AccountMenu
                    {...rest}
                    isLoggedIn
                    name={null} // don't show on desktop
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DarkMode>
    </Hidden>
  );
};

ProfileBar.propTypes = {
  children: PropTypes.node.isRequired,
  companyName: PropTypes.string,
  profileImgSrc: PropTypes.string,
};

ProfileBar.defaultProps = {
  companyName: '3merge',
  profileImgSrc: astronaut,
};

export default ProfileBar;
