import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'q3-ui-locale';
import { last } from 'lodash';
import moment from 'moment';
import GetAppIcon from '@material-ui/icons/GetApp';

export const useCreatedAtTitle = ({ createdAt }) => {
  const { t } = useTranslation('labels');

  return createdAt
    ? moment(createdAt).utc().local().format('LLL')
    : t('within48');
};

const NotificationLink = ({
  id,
  label,
  hasDownloaded,
  onClick,
  url,
  ...rest
}) => (
  <ListItem dense selected={!hasDownloaded}>
    <ListItemIcon>
      <GetAppIcon />
    </ListItemIcon>
    <ListItemText
      primary={useCreatedAtTitle(rest)}
      secondary={
        <Link
          href={url}
          style={{ color: 'inherit' }}
          download
          onClick={
            !hasDownloaded
              ? (e) => onClick(e, id)
              : undefined
          }
        >
          {last(label.split('/'))}
        </Link>
      }
    />
  </ListItem>
);

NotificationLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hasDownloaded: PropTypes.bool,
  onClick: PropTypes.func,
  url: PropTypes.string.isRequired,
};

NotificationLink.defaultProps = {
  hasDownloaded: false,
  onClick: undefined,
};

export default NotificationLink;
