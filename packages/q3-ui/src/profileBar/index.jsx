import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import { useToggle } from 'useful-state';
import Grid from '@material-ui/core/Grid';
import SwapHoriz from '@material-ui/icons/KeyboardArrowLeft';
import Close from '@material-ui/icons/KeyboardArrowRight';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AccountMenu } from '../toolbar';
import astronaut from '../../images/astronaut.png';
import Logo from '../logo';
import DarkMode from '../darkMode';
import useStyles from './useStyle';

export const getIcon = (v) =>
  v ? <Close /> : <SwapHoriz />;

const ProfileBar = ({ companyName, children, ...rest }) => {
  const matches = useMediaQuery('(min-width:1200px)');

  const { t } = useTranslation();
  const { colourful, trigger } = useStyles();
  const { toggle, state, open, close } = useToggle();

  React.useEffect(() => {
    if (!matches) {
      open();
    } else {
      close();
    }
  }, [matches]);

  return (
    <Hidden smDown implementation="css">
      <DarkMode>
        <Box
          height="100%"
          component="aside"
          width={state ? 80 : 250}
          className={colourful}
          style={{ transition: 'width 350ms' }}
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
      </DarkMode>
      <Fab
        size="small"
        aria-label={t('toggleMenuSize')}
        onClick={toggle}
        className={trigger}
      >
        {getIcon(state)}
      </Fab>
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
