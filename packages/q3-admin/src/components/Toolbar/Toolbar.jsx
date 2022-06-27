import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import ToolbarProfile from '../ToolbarProfile';
import ButtonWithIcon from '../ButtonWithIcon';
import Notifications from '../../containers/Notifications';
import useStyle from './styles';

const Toolbar = ({ profileOptions }) => {
  const cls = useStyle();

  return (
    <Box
      className={cls.root}
      bgcolor="background.paper"
      display="flex"
      justifyContent="space-between"
      id="app-toolbar"
    >
      <Hidden lgUp>
        <ButtonWithIcon
          label="menu"
          icon={MenuIcon}
          onClick={() => {
            document.getElementById('app-menu').click();
          }}
        />
      </Hidden>
      <Box
        className={cls.actions}
        flex={1}
        id="app-toolbar-collection-actions"
      />
      <Notifications />
      <ToolbarProfile options={profileOptions} />
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
