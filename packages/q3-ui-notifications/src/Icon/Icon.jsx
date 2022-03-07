import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Badge, Avatar } from '@material-ui/core';
import Drafts from '@material-ui/icons/Drafts';
import Mail from '@material-ui/icons/Mail';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import CommentIcon from '@material-ui/icons/Comment';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const Icon = ({ hasSeen, messageType }) => (
  <Badge
    invisible={hasSeen}
    variant="dot"
    color="secondary"
  >
    <Avatar
      style={{
        backgroundColor: 'var(--background-muted)',
        color: 'inherit',
      }}
    >
      {hasSeen
        ? get(
            {
              document: <ModeCommentIcon />,
              download: <CloudQueueIcon />,
            },
            messageType,
            <Drafts />,
          )
        : get(
            {
              document: <CommentIcon />,
              download: <CloudIcon />,
            },
            messageType,
            <Mail />,
          )}
    </Avatar>
  </Badge>
);
Icon.defaultProps = {
  hasSeen: false,
  messageType: '',
};

Icon.propTypes = {
  hasSeen: PropTypes.bool,
  messageType: PropTypes.string,
};

export default Icon;
