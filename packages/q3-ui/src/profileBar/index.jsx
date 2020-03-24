import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/KeyboardArrowRight';
import { AccountMenu } from '../toolbar';
import Logo from '../logo';
import useStyles from './useStyle';
import Offcanvas from '../offcanvas';
import IconMenu from '../iconMenu';
import Menu from '../menu';

const ProfileBar = ({
  companyName,
  items,
  popoutMenuItems,
}) => {
  const { colourful, trigger, shell } = useStyles();

  return (
    <Box className={shell}>
      <Box component="aside" className={colourful}>
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
        <Box py={2} px={1} align="center">
          <AccountMenu
            items={popoutMenuItems}
            isLoggedIn
            name={null}
          />
        </Box>
      </Box>
    </Box>
  );
};

ProfileBar.propTypes = {
  companyName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  popoutMenuItems: PropTypes.arrayOf(
    PropTypes.shape({ onClick: PropTypes.func }),
  ),
};

ProfileBar.defaultProps = {
  companyName: '3merge',
  popoutMenuItems: [],
};

export default ProfileBar;
