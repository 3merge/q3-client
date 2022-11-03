import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import Back from '../../containers/back';
import ToolbarProfile from '../ToolbarProfile';
import ButtonWithIcon from '../ButtonWithIcon';
import Notifications from '../../containers/Notifications';
import Logo from '../Logo';
import useStyle from './styles';

const Toolbar = ({ profileOptions }) => {
  const cls = useStyle();

  return (
    <Box
      className={cls.root}
      bgcolor="background.paper"
      display="flex"
      justifyContent="space-between"
      id="appbar"
    >
      <Box alignItems="center" display="flex">
        <ButtonWithIcon
          label="menu"
          icon={MenuIcon}
          onClick={() =>
            document.getElementById('app-menu').click()
          }
        />
        <Logo />
      </Box>
      <Box
        id="appbar-mobile-top"
        className={cls.actionsTop}
      >
        <Box id="appbar-filter" />
        <Box id="appbar-settings" />
      </Box>
      <Box id="appbar-mobile" className={cls.actions}>
        {/** sets default home button */}
        <Box className={cls.back} id="appbar-back">
          <Back />
        </Box>
        <Box id="appbar-search" />
        <Box id="appbar-create" />
        <Notifications />
        <ToolbarProfile options={profileOptions} />
      </Box>
    </Box>
  );
};

Toolbar.defaultProps = {
  profileOptions: {},
};

Toolbar.propTypes = {
  profileOptions: PropTypes.arrayOf(
    PropTypes.shape({
      divider: PropTypes.bool,
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default Toolbar;
