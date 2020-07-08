import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  ...rest
}) => {
  const { colourful, shell } = useStyles();

  return (
    <Hidden mdDown implementation="css">
      <Box className={shell}>
        <Box
          id="profile-bar"
          component="aside"
          className={colourful}
        >
          <IconMenu items={items} />
        </Box>
      </Box>
    </Hidden>
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
