import React from 'react';
import PropTypes from 'prop-types';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({ profileItems }) => {
  const items = [...profileItems];
  const { state } = React.useContext(AuthContext);

  return (
    <AppHeaderDropdown
      src={get(state, 'profile.photo')}
      items={items.concat({
        label: 'logout',
        onClick: () => destroySession(),
      })}
    />
  );
};

ProfileActions.propTypes = {
  profileItems: PropTypes.arrayOf(PropTypes.object),
};

ProfileActions.defaultProps = {
  profileItems: [],
};

export default ProfileActions;
