import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'q3-ui-dropdownmenu';
import {
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { object } from 'q3-ui-helpers';
import { omit } from 'lodash';
import Confirm from 'q3-ui-confirm';

const NotificationsListItemActions = ({ handlers }) => {
  const withEventSuppression = (fn) => (e) => {
    object.cancelEvents(e);
    return object.noop(fn(e));
  };

  const getItems = (fn) =>
    Object.entries(omit(handlers, ['click'])).map(
      ([key, value]) => ({
        label: key,
        onClick: withEventSuppression(
          key === 'delete' ? fn : value,
        ),
      }),
    );

  return (
    <ListItemSecondaryAction>
      <Confirm
        title="confirm"
        description="confirm"
        service={handlers.delete}
        label="addToTrash"
        phrase="DELETE"
        // eslint-disable-next-line
        ButtonComponent={({
          onClick: openConfirmation,
        }) => (
          <DropdownMenu items={getItems(openConfirmation)}>
            {(onClick) => (
              <IconButton
                onClick={withEventSuppression(onClick)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </DropdownMenu>
        )}
      />
    </ListItemSecondaryAction>
  );
};

NotificationsListItemActions.propTypes = {
  handlers: PropTypes.shape({
    delete: PropTypes.func,
  }).isRequired,
};

export default NotificationsListItemActions;
