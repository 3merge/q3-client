import React from 'react';
import { Box, Chip } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import PropTypes from 'prop-types';
import { compact, first } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AttachmentIcon from '@material-ui/icons/Attachment';
import FauxLink from '../FauxLink';

const NotificationsItemContent = ({
  createdAt,
  excerpt,
  localUrl,
  messageType,
  url,
}) => {
  const { t } = useTranslation('labels');

  const getHtml = React.useCallback(
    () =>
      compact([excerpt, string.toHoursMinutes(createdAt)])
        .join(' ∙ ')
        .trim(),
    [createdAt, excerpt],
  );

  const Link = React.useMemo(() => {
    if (url)
      return (
        <FauxLink>
          {first(String(url).split('?')).substring(
            url.lastIndexOf('/') + 1,
          )}{' '}
          <AttachmentIcon />
        </FauxLink>
      );

    if (localUrl)
      return (
        <FauxLink>
          {t('readMore')} <OpenInNewIcon />
        </FauxLink>
      );

    return null;
  }, [localUrl, url]);

  const MessageTypeChip = React.useMemo(
    () =>
      messageType ? (
        <Box display="inline-block" mr={1}>
          <Chip
            className={`notifications-${messageType}`}
            label={messageType}
            size="small"
          />
        </Box>
      ) : null,
    [messageType],
  );

  return (
    <>
      {MessageTypeChip}
      <span
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: getHtml(),
        }}
      />
      {Link}
    </>
  );
};

NotificationsItemContent.defaultProps = {
  excerpt: undefined,
  localUrl: undefined,
  messageType: undefined,
  url: undefined,
};

NotificationsItemContent.propTypes = {
  createdAt: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  localUrl: PropTypes.string,
  messageType: PropTypes.string,
  url: PropTypes.string,
};

export default NotificationsItemContent;
