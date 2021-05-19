import React from 'react';
import PropTypes from 'prop-types';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { ModeContext } from 'q3-ui/lib/Mode';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import IconButton from '@material-ui/core/IconButton';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({
  enableThemeTypeToggle,
  profileItems,
}) => {
  const items = [...profileItems];
  const { state } = React.useContext(AuthContext);
  const { isLight, toggle } = React.useContext(ModeContext);

  return (
    <>
      {enableThemeTypeToggle && (
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
      )}
      <AppHeaderDropdown
        src={get(state, 'profile.photo')}
        items={items.concat({
          label: 'logout',
          onClick: () => destroySession(),
        })}
      />
    </>
  );
};

ProfileActions.propTypes = {
  profileItems: PropTypes.arrayOf(PropTypes.object),
  enableThemeTypeToggle: PropTypes.bool,
};

ProfileActions.defaultProps = {
  enableThemeTypeToggle: true,
  profileItems: [],
};

export default ProfileActions;
