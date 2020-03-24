import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
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
  const { colourful } = useStyles();

  return (
    <Hidden smDown implementation="css">
      <DarkMode>
        <Box
          height="100vh"
          component="aside"
          className={colourful}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            <Grid item xs={12} style={{ width: '100%' }}>
              <Logo name={companyName} />
              {children}
            </Grid>
            <Grid item xs={12}>
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
