import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DropdownMenu from '../DropdownMenu';

export const AccountMenu = ({ src, items }) =>
  Array.isArray(items) ? (
    <DropdownMenu id="profile-dropdown" items={items}>
      {(toggle) => (
        <IconButton onClick={toggle} color="inherit">
          <Avatar
            alt="profile picture"
            src={src}
            variant="rounded"
          />
        </IconButton>
      )}
    </DropdownMenu>
  ) : null;

AccountMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),

  src: PropTypes.string,
};

AccountMenu.defaultProps = {
  items: [],
  src: undefined,
};

export default AccountMenu;
