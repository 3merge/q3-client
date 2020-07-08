import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { destroySession } from 'q3-ui-permissions';
import IconButton from 'q3-ui/lib/iconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyle from './useStyle';
import AppHeaderDropdown from '../AppHeaderDropdown';

const ProfileActions = ({ children, profileItems }) => {
  const items = [...profileItems];
  const cls = useStyle();

  const theme = useTheme();
  const isMobileDevice = useMediaQuery(
    theme.breakpoints.down('md'),
  );

  React.useEffect(() => {
    if (isMobileDevice)
      items.push({
        label: 'logout',
        onClick: destroySession,
      });
  }, [isMobileDevice]);

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      spacing={1}
    >
      <Grid item>
        <Grid
          container
          alignItems="center"
          className={cls.root}
        >
          <AppHeaderDropdown items={items} />
          {children}
        </Grid>
      </Grid>
      {!isMobileDevice && (
        <Grid item>
          <IconButton
            label="logout"
            icon={ExitToAppIcon}
            buttonProps={{
              onClick: destroySession,
            }}
          />
        </Grid>
      )}
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
