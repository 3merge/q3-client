import React from 'react';
import {
  ListItemText,
  ListItemAvatar,
  Box,
  ListItem,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import PropTypes from 'prop-types';
import { compact, isFunction } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import NotificationsListItemLink from '../NotificationsListItemLink';
import NotificationsListItemMessage from '../NotificationsListItemMessage';
import Icon from '../Icon';

const NotificationsListItem = ({
  hasSeen,
  label,
  createdAt,
  messageType,
  excerpt,
  id,
  onClick,
  url,
  read,
  updateToRead,
  ...props
}) => {
  const { t } = useTranslation('labels');

  const getMessageType = () => {
    if (messageType) return messageType;
    return url ? 'download' : undefined;
  };

  const getPrimary = () => {
    if ((url && !messageType) || messageType === 'download')
      return t('newDownloadAvailable');

    return label;
  };

  return (
    <Box component="li">
      <ListItem
        {...props}
        button
        dense
        onClick={updateToRead}
        selected={!read}
      >
        <ListItemAvatar>
          <Icon
            hasSeen={read}
            messageType={getMessageType()}
          />
        </ListItemAvatar>
        <ListItemText
          primary={getPrimary()}
          secondary={
            <span
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: compact([
                  string.toHoursMinutes(createdAt),
                  excerpt,
                ])
                  .join(' — ')
                  .trim(),
              }}
            />
          }
        />
      </ListItem>
    </Box>
  );
};

NotificationsListItem.defaultProps = {
  onClick: null,
  messageType: undefined,
  excerpt: undefined,
  hasSeen: false,
  url: undefined,
  label: undefined,
};

NotificationsListItem.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  messageType: PropTypes.string,
  hasSeen: PropTypes.bool,
  label: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  url: PropTypes.string,
};

export default NotificationsListItem;
