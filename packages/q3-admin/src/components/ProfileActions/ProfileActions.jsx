import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { ModeContext } from 'q3-ui/lib/Mode';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import IconButton from '@material-ui/core/IconButton';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({ children, profileItems }) => {
  const items = [...profileItems];
  const { state } = React.useContext(AuthContext);
  const { isLight, toggle } = React.useContext(ModeContext);

  return (
    <Grid
      container
      alignItems="center"
      justify="flex-end"
      style={{ minWidth: 127 }}
    >
      <Grid item>{children}</Grid>
      <Grid item>
        <IconButton
          color="inherit"
          onClick={toggle}
          label="color mode"
        >
          {isLight ? (
            <Brightness4Icon />
          ) : (
            <BrightnessHighIcon />
          )}
        </IconButton>
        <AppHeaderDropdown
          src={get(state, 'profile.photo')}
          items={items.concat({
            label: 'logout',
            onClick: () => destroySession(),
          })}
        />
      </Grid>
    </Grid>
  );
};

ProfileActions.propTypes = {
  children: PropTypes.node.isRequired,
  profileItems: PropTypes.arrayOf(PropTypes.object),
};

ProfileActions.defaultProps = {
  profileItems: [],
};

export default ProfileActions;
