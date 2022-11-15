import React from 'react';
import {
  ListItemText,
  ListItemAvatar,
  Box,
  ListItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { object } from 'q3-ui-helpers';
import { pick } from 'lodash';
import Icon from '../Icon';
import NotificationsItemContent from '../NotificationsItemContent';
import NotificationsItemTitle from '../NotificationsItemTitle';
import NotificationsListItemCheckbox from '../NotificationsListItemCheckbox';
import NotificationsListItemActions from '../NotificationsListItemActions';

const NotificationsListItem = (props) => {
  const {
    archived,
    createdAt,
    excerpt,
    handlers,
    id,
    label,
    localUrl,
    messageType,
    read,
    url,
  } = props;

  const ref = React.useRef();
  const handleClick = (e) => {
    if (ref.current && ref.current.contains(e.target)) {
      handlers.click(e);
    }
  };

  return (
    <Box component="li">
      <ListItem
        {...props}
        button
        dense
        onClick={handleClick}
        selected={!read}
        disableRipple
        ref={ref}
      >
        <NotificationsListItemCheckbox id={id} />
        <ListItemAvatar>
          <Icon
            archived={Boolean(archived)}
            read={Boolean(read)}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <NotificationsItemTitle
              label={label}
              messageType={messageType}
              url={url}
            />
          }
          secondary={
            <NotificationsItemContent
              createdAt={createdAt}
              excerpt={excerpt}
              localUrl={localUrl}
              messageType={messageType}
              url={url}
            />
          }
        />
        <NotificationsListItemActions handlers={handlers} />
      </ListItem>
    </Box>
  );
};

const propsTypes = {
  archived: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  handlers: PropTypes.shape({
    click: PropTypes.func,
  }).isRequired,
  label: PropTypes.string,
  localUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  messageType: PropTypes.string,
  read: PropTypes.bool,
  url: PropTypes.string,
};

NotificationsListItem.defaultProps = {
  archived: false,
  excerpt: undefined,
  label: undefined,
  localUrl: undefined,
  messageType: undefined,
  read: false,
  url: undefined,
};

NotificationsListItem.propTypes = propsTypes;

export default React.memo(NotificationsListItem, (a, b) => {
  const props = Object.keys(propsTypes).concat('updatedAt');

  return (
    object.toJSON(pick(a, props)) ===
    object.toJSON(pick(b, props))
  );
});
