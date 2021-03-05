import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({ children, profileItems }) => {
  const items = [...profileItems];
  const { state } = React.useContext(AuthContext);

  return (
    <Grid
      container
      alignItems="center"
      justify="flex-end"
      style={{ minWidth: 84 }}
    >
      <Grid item>{children}</Grid>
      <Grid item>
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
