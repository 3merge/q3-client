import React from 'react';
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
      compact([
        messageType,
        excerpt,
        string.toHoursMinutes(createdAt),
      ])
        .join(' ∙ ')
        .trim(),
    [createdAt, excerpt],
  );

  const Link = React.useMemo(() => {
    if (url)
      return (
        <FauxLink>
          <AttachmentIcon />
          {first(String(url).split('?')).substring(
            url.lastIndexOf('/') + 1,
          )}{' '}
        </FauxLink>
      );

    if (localUrl)
      return (
        <FauxLink>
          <OpenInNewIcon />
          {t('readMore')}
        </FauxLink>
      );

    return null;
  }, [localUrl, url]);

  return (
    <>
      <div
        style={{ marginRight: 64 }}
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
