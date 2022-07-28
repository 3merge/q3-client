import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { toMbs } from '../utils';
import useStyle from './styles';

const ListItemContent = ({
  children,
  onClick,
  name,
  size,
}) => {
  const cls = useStyle();

  return (
    <>
      <ListItemAvatar>
        <Avatar className={cls.avatar}>{children}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={toMbs(size)}
        primaryTypographyProps={{
          style: {
            lineBreak: 'anywhere',
          },
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="options"
          component="span"
          onClick={onClick}
          role="button"
        >
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

ListItemContent.defaultProps = {
  children: null,
  size: 0,
};

ListItemContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default ListItemContent;
