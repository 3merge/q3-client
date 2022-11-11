import React from 'react';
import {
  ListItemText,
  ListItemAvatar,
  Box,
  ListItem,
  Chip,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import PropTypes from 'prop-types';
import { compact, first } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Icon from '../Icon';

const getFileName = (url) => {
  const filename = first(String(url).split('?')).substring(
    url.lastIndexOf('/') + 1,
  );
  return filename;
};

// eslint-disable-next-line
const FauxLink = ({ children }) => (
  <span
    style={{
      textDecoration: 'underline',
    }}
  >
    {children}
  </span>
);

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
  localUrl,
  ...props
}) => {
  const { t } = useTranslation('labels');

  const getMessageType = () => {
    if (messageType)
      return (
        <Box display="inline-block" mr={1}>
          <Chip
            className={`notifications-${messageType}`}
            label={messageType}
            size="small"
          />
        </Box>
      );
    return null;
  };

  const getPrimary = () => {
    if (label) return label;
    if ((url && !messageType) || messageType === 'download')
      return t('newDownloadAvailable');

    return '';
  };

  const renderFauxLink = () => {
    if (url)
      return (
        <FauxLink>
          {getFileName(url)} <AttachmentIcon />
        </FauxLink>
      );
    if (localUrl)
      return (
        <FauxLink>
          readmore <OpenInNewIcon />
        </FauxLink>
      );
    return null;
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
        <ListItemIcon>
          <Checkbox
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </ListItemIcon>
        <ListItemAvatar>
          <Icon hasSeen={read} />
        </ListItemAvatar>
        <ListItemText
          primary={getPrimary()}
          secondary={
            <>
              {getMessageType()}
              <span
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{
                  __html: compact([
                    excerpt,
                    string.toHoursMinutes(createdAt),
                  ])
                    .join(' ∙ ')
                    .trim(),
                }}
              />
              <Box mt={0.5}>{renderFauxLink()}</Box>
            </>
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
