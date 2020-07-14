import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';

const NotificationLink = ({
  id,
  label,
  hasBeenDownloaded,
  onClick,
  url,
}) => {
  const { t } = useTranslation();

  return (
    <ListItem dense selected={!hasBeenDownloaded}>
      <ListItemText
        primary={t('titles:downloadable')}
        secondary={
          <Link
            href={url}
            download
            onClick={(e) => {
              return !hasBeenDownloaded
                ? onClick(e, id)
                : undefined;
            }}
          >
            {t('labels:download')} {label}
          </Link>
        }
      />
    </ListItem>
  );
};

NotificationLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hasBeenDownloaded: PropTypes.bool,
  onClick: PropTypes.func,
  url: PropTypes.string.isRequired,
};

NotificationLink.defaultProps = {
  hasBeenDownloaded: false,
  onClick: undefined,
};

export default NotificationLink;
