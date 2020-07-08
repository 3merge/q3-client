import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { destroySession } from 'q3-ui-permissions';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({ children, profileItems }) => {
  const items = [...profileItems];

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      style={{ height: 85 }}
    >
      <Grid item>{children}</Grid>
      <Grid item>
        <AppHeaderDropdown
          items={items.concat({
            label: 'logout',
            onClick: destroySession,
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
