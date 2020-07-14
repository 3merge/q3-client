import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTranslation } from 'react-i18next';
import { browser, object } from 'q3-ui-helpers';

const NotificationReadOnly = ({
  id,
  label,
  hasSeen,
  onView,
}) => {
  const { t } = useTranslation('titles');
  const ref = React.createRef();

  const detach = (obv) => {
    try {
      obv.unobserve(ref.current);
    } catch (e) {
      // null
    }
  };

  React.useEffect(() => {
    if (
      !object.isFn(onView) ||
      !browser.isBrowserReady() ||
      !ref.current
    )
      return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = get(entries, '0', {});
        if (
          get(entry, 'isIntersecting', false) === true &&
          !hasSeen
        ) {
          try {
            onView(entry, id);
            detach(observer);
          } catch (e) {
            // noop
          }
        }
      },
      { threshold: [1] },
    );

    observer.observe(ref.current);
    return () => detach(observer);
  }, []);

  return (
    <ListItem ref={ref} selected={!hasSeen}>
      <ListItemText
        primary={t('notification')}
        secondary={label}
      />
    </ListItem>
  );
};

NotificationReadOnly.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hasSeen: PropTypes.bool,
  onView: PropTypes.func,
};

NotificationReadOnly.defaultProps = {
  hasSeen: false,
  onView: undefined,
};

export default NotificationReadOnly;
