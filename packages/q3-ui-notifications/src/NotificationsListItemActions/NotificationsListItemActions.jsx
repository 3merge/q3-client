import React from 'react';
import DropdownMenu from 'q3-ui-dropdownmenu';
import {
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { object } from 'q3-ui-helpers';
import { omit } from 'lodash';

const NotificationsListItemActions = ({ handlers }) => {
  const withEventSuppression = (fn) => (e) => {
    object.cancelEvents(e);
    return object.noop(fn(e));
  };

  const getItems = () =>
    Object.entries(omit(handlers, ['click'])).map(
      ([key, value]) => ({
        label: key,
        onClick: withEventSuppression(value),
      }),
    );

  return (
    <ListItemSecondaryAction>
      <DropdownMenu items={getItems()}>
        {(onClick) => (
          <IconButton
            onClick={withEventSuppression(onClick)}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </DropdownMenu>
    </ListItemSecondaryAction>
  );
};

export default NotificationsListItemActions;
