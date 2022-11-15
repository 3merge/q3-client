import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';

const NotificationsItemTitle = ({
  label,
  messageType,
  url,
}) => {
  const { t } = useTranslation('labels');

  return React.useMemo(() => {
    if (label) return label;
    if ((url && !messageType) || messageType === 'download')
      return t('newDownloadAvailable');

    return '';
  }, [label, messageType, url]);
};

NotificationsItemTitle.defaultProps = {
  label: undefined,
  messageType: undefined,
  url: undefined,
};

NotificationsItemTitle.propTypes = {
  label: PropTypes.string,
  messageType: PropTypes.string,
  url: PropTypes.string,
};

export default NotificationsItemTitle;
