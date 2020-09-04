import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import AppHeaderDropdown from '../AppHeaderDropdown';
import useStyle from '../useStyle';

const ProfileActions = ({ children, profileItems }) => {
  const items = [...profileItems];
  const { state } = React.useContext(AuthContext);
  const cls = useStyle();

  return (
    <Box
      position="absolute"
      top={0}
      right={1}
      className={cls.appbar}
    >
      <Grid
        container
        alignItems="center"
        style={{ height: '100%' }}
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
    </Box>
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
