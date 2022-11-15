import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Avatar } from '@material-ui/core';
import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import useStyle from './styles';

const Icon = ({ archived, read }) => (
  <Badge
    invisible={read}
    variant="dot"
    color="secondary"
    className={useStyle().badge}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <Avatar
      style={{
        backgroundColor: 'var(--background-muted)',
        color: 'inherit',
      }}
    >
      {
        // eslint-disable-next-line
        archived ? (
          <FolderSpecialIcon />
        ) : read ? (
          <Drafts />
        ) : (
          <Mail />
        )
      }
    </Avatar>
  </Badge>
);
Icon.defaultProps = {
  archived: false,
  read: false,
};

Icon.propTypes = {
  archived: PropTypes.bool,
  read: PropTypes.string,
};

export default Icon;
