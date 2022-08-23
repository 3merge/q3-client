import React from 'react';
import { Link } from '@reach/router';
import { string } from 'q3-ui-helpers';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Hidden,
} from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { AuthContext } from 'q3-ui-permissions';
import { destroySession } from 'q3-ui-permissions';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import useStyle from './styles';

export const getProps = ({
  isCurrent,
  isPartiallyCurrent,
}) => ({
  'data-state':
    isCurrent || isPartiallyCurrent ? 'active' : 'inactive',
});

export const logout = (e) => {
  e.preventDefault();
  destroySession();
};

const ToolbarProfile = ({ options }) => {
  const { state } = React.useContext(AuthContext);
  const cls = useStyle();

  return (
    <Box display="inline-block">
      <Hidden lgUp>
        <ButtonWithIcon
          component={Link}
          label="profile"
          icon={AccountBox}
          to="account"
          getProps={getProps}
        />
      </Hidden>
      <Hidden mdDown>
        <DropdownMenu
          items={[
            {
              label: 'profile',
              to: 'account',
            },
            ...Array.from(options),
            {
              label: 'logout',
              onClick: logout,
            },
          ]}
        >
          {(toggle) => (
            <ListItem
              button
              className={cls.listItem}
              dense
              onClick={toggle}
            >
              <ListItemAvatar>
                <Avatar src={state?.profile?.photo} />
              </ListItemAvatar>
              <ListItemText
                primary={string.makeName(state?.profile)}
                secondary={state?.profile?.role}
              />
            </ListItem>
          )}
        </DropdownMenu>
      </Hidden>
    </Box>
  );
};

ToolbarProfile.defaultProps = {
  options: [],
};

ToolbarProfile.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      divider: PropTypes.bool,
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

export default ToolbarProfile;
