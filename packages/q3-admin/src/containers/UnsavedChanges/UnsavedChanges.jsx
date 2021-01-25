import React from 'react';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { toLocal } from 'q3-ui-locale/lib/timezone';
import { Store } from '../state';
import PollIndicator from '../../components/PollIndicator';
import PendingChangesModal from '../../components/PendingChangesModal';
import { useRefresh } from '../../hooks';

const refresh = () => {
  if (browser.isBrowserReady()) window.location.reload();
};

export const useChangeDetection = () => {
  const [hasChange, setHasChange] = React.useState(false);

  React.useEffect(() => {
    if (browser.isBrowserReady())
      document.addEventListener(
        'q3-change-detection',
        (e) => setHasChange(!e?.data),
      );
  }, []);

  return hasChange;
};

export const useTimeTracking = (v) => {
  const [hasPending, setHasPending] = React.useState(false);
  const [hasRefresh, setHasRefresh] = React.useState(false);

  useRefresh((search, d) => {
    setHasPending(d?.updatedAt);
    return Promise.resolve();
  });

  React.useEffect(() => {
    if (!hasPending) return;

    if (moment(v).isBefore(toLocal(hasPending)))
      setHasRefresh(true);
    else setHasPending(null);
  }, [v, hasPending]);

  return {
    hasPending,
    hasRefresh,
    setHasPending,
    setHasRefresh,
  };
};

export default () => {
  const {
    hasPending,
    hasRefresh,
    setHasRefresh,
  } = useTimeTracking(
    React.useContext(Store)?.data?.updatedAt,
  );

  const hasChange = useChangeDetection();

  return (
    <>
      <PollIndicator
        hasPendingUpdate={Boolean(hasPending)}
        hasChange={hasChange}
        lastUpdated={new Date()}
      />
      {hasRefresh && (
        <PendingChangesModal
          onDecline={() => setHasRefresh(false)}
          onReload={refresh}
        />
      )}
    </>
  );
};
