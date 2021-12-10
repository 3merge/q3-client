import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'q3-ui-locale';
import { invoke, last } from 'lodash';
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
  <ListItem
    button
    component="li"
    dense
    selected={!hasDownloaded}
    onClick={(e) =>
      Promise.resolve(
        !hasDownloaded ? onClick(e, id) : null,
      ).then(() => {
        invoke(window, 'open', url, '_blank');
      })
    }
  >
    <ListItemIcon>
      <GetAppIcon />
    </ListItemIcon>
    <ListItemText
      primary={useCreatedAtTitle(rest)}
      secondary={
        <span
          style={{
            color: 'inherit',
            textDecoration: 'underline',
          }}
        >
          {last(label.split('/'))}
        </span>
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
