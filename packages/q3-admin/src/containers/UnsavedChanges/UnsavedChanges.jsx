import React from 'react';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { toLocal } from 'q3-ui-locale/lib/timezone';
import Hidden from '@material-ui/core/Hidden';
import { Store } from '../state';
import PollIndicator from '../../components/PollIndicator';
import PendingChangesModal from '../../components/PendingChangesModal';
import { useRefresh } from '../../hooks';
import {
  addDocumentListener,
  removeDocumentListener,
} from '../../hooks/useNotifications';
import withActionPortal from '../../components/withActionPortal';

const refresh = () => {
  if (browser.isBrowserReady()) window.location.reload();
};

export const useChangeDetection = () => {
  const [hasChange, setHasChange] = React.useState(false);

  const handleEvent = (e) => setHasChange(!e?.data);

  React.useEffect(() => {
    const ev = 'q3-change-detection';
    addDocumentListener(ev, handleEvent);

    return () => {
      removeDocumentListener(ev, handleEvent);
    };
  }, []);

  return hasChange;
};

export const useTimeTracking = (id, lastUpdatedAt) => {
  const [hasPending, setHasPending] = React.useState(false);
  const [hasRefresh, setHasRefresh] = React.useState(false);

  useRefresh((search, d) => {
    if (d?.id === id) setHasPending(d?.updatedAt);
    return Promise.resolve();
  });

  React.useEffect(() => {
    if (!hasPending) return;

    if (moment(lastUpdatedAt).isBefore(toLocal(hasPending)))
      setHasRefresh(true);
    else setHasPending(null);
  }, [lastUpdatedAt, hasPending]);

  return {
    hasPending,
    hasRefresh,
    setHasPending,
    setHasRefresh,
  };
};

export const UnsavedChanges = () => {
  const { data } = React.useContext(Store);
  const hasChange = useChangeDetection();

  const {
    hasPending,
    hasRefresh,
    setHasRefresh,
  } = useTimeTracking(data?.id, data?.updatedAt);

  return (
    <Hidden mdDown implementation="css">
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
    </Hidden>
  );
};

export default withActionPortal(UnsavedChanges, {
  elementId: 'q3-collection-actions-top',
});
