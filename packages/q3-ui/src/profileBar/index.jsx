import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/KeyboardArrowRight';
import { AccountMenu } from '../toolbar';
import astronaut from '../../images/astronaut.png';
import Logo from '../logo';
import DarkMode from '../darkMode';
import useStyles from './useStyle';
import Offcanvas from '../offcanvas';

import IconMenu from '../iconMenu';
import Menu from '../menu';

const ProfileBar = ({ companyName, items, ...rest }) => {
  const { colourful, mobileColumn, trigger } = useStyles();

  return (
    <DarkMode>
      <Box width={105} />
      <Box component="aside" className={colourful}>
        <Grid container className={mobileColumn}>
          <Grid
            item
            md={12}
            sm={6}
            xs={6}
            style={{ width: '100%' }}
          >
            <Offcanvas
              left
              color="primary"
              menu={(props) =>
                React.createElement(Menu, {
                  ...props,
                  items,
                })
              }
            >
              {(toggle) => (
                <>
                  <Hidden smDown implementation="css">
                    <Logo name={companyName} />
                    <IconMenu items={items} />
                  </Hidden>
                  <Fab
                    onClick={toggle}
                    className={trigger}
                    size="small"
                  >
                    <Hidden smDown>
                      <Close />
                    </Hidden>
                    <Hidden mdUp>
                      <MenuIcon />
                    </Hidden>
                  </Fab>
                </>
              )}
            </Offcanvas>
          </Grid>
          <Grid item md={12} xs={6}>
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
