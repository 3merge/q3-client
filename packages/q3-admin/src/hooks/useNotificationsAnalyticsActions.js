import React from 'react';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import DraftsIcon from '@material-ui/icons/Drafts';
import { object } from 'q3-ui-helpers';
import axios from 'axios';
import { NOTIFICATION_ANALYTICS_ENDPOINT } from './useNotificationsAnalytics';

export default (doc = {}, options = {}) => {
  const initialValue =
    typeof options?.initialValue === 'boolean'
      ? options.initialValue
      : doc?.read;

  const [state, setState] = React.useState(initialValue);

  const sendToServer = (read) => () =>
    object.noop(
      axios
        .post(NOTIFICATION_ANALYTICS_ENDPOINT, {
          documentId: doc.id,
          subDocumentId: undefined,
          read,
        })
        .then(() => {
          setState(read);
        }),
    );

  React.useEffect(() => {
    setState(initialValue);
  }, [initialValue]);

  return state
    ? [
        {
          icon: MarkunreadIcon,
          label: 'markAsUnread',
          onClick: sendToServer(false),
        },
      ]
    : [
        {
          icon: DraftsIcon,
          label: 'markAsRead',
          onClick: sendToServer(true),
        },
      ];
};
