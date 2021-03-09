import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import UpdateIcon from '@material-ui/icons/Update';
import FlareIcon from '@material-ui/icons/Flare';
import useStyle from './useStyle';

export const getIcon = (args = {}) => {
  const { hasChange, hasPendingUpdate } = args;
  if (hasChange) return TrackChangesIcon;
  if (hasPendingUpdate) return FlareIcon;
  return UpdateIcon;
};

export const getText = (args = {}) => {
  const { hasChange, hasPendingUpdate } = args;
  if (hasChange) return 'unsavedChanges';
  if (hasPendingUpdate) return 'pendingUpdate';
  return 'lastRefreshed';
};

const PollIndicator = ({
  lastUpdated,
  hasPendingUpdate,
  hasChange,
}) => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const cls = useStyle({
    hasPendingUpdate,
    hasChange,
  });

  const IconEl = getIcon({
    hasPendingUpdate,
    hasChange,
  });

  return (
    <Button
      size="small"
      className={cls.label}
      onClick={() => window.location.reload()}
      color="inherit"
    >
      <IconEl ref={ref} className={cls.dot} />
      <span className={cls.text}>
        {t(
          getText({
            hasPendingUpdate,
            hasChange,
          }),
          {
            time: moment
              .parseZone(lastUpdated)
              .format('LT'),
          },
        )}
      </span>
    </Button>
  );
};

PollIndicator.defaultProps = {
  hasChange: false,
  hasPendingUpdate: false,
  lastUpdated: new Date(),
};

PollIndicator.propTypes = {
  // eslint-disable-next-line
  lastUpdated: PropTypes.object,
  hasChange: PropTypes.bool,
  hasPendingUpdate: PropTypes.bool,
};

export default PollIndicator;
