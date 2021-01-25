import React from 'react';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { Store } from '../state';
import PollIndicator from '../../components/PollIndicator';
import PendingChangesModal from '../../components/PendingChangesModal';
import { useRefresh } from '../../hooks';

const refresh = () => {
  if (browser.isBrowserReady()) window.location.reload();
};

export default () => {
  const {
    data: { updatedAt },
  } = React.useContext(Store);
  const [showRefresh, setShowRefresh] = React.useState(
    false,
  );

  const [hasChange, setHasChange] = React.useState(false);
  const [hasPending, setHasPending] = React.useState(false);

  useRefresh((search, d) => {
    setHasPending(d?.data?.updatedAt);
    return Promise.resolve();
  });

  React.useEffect(() => {
    if (!hasPending) return;

    if (
      moment(hasPending).isAfter(
        moment(updatedAt).toISOString(),
      )
    )
      setShowRefresh(true);
    else setHasPending(null);
  }, [updatedAt, hasPending]);

  React.useEffect(() => {
    if (browser.isBrowserReady())
      document.addEventListener(
        'q3-change-detection',
        (e) => setHasChange(!e.data),
      );
  }, []);

  return (
    <>
      <PollIndicator
        hasPendingUpdate={Boolean(hasPending)}
        hasChange={hasChange}
        lastUpdated={new Date()}
      />
      {showRefresh && (
        <PendingChangesModal
          onDecline={() => setShowRefresh(false)}
          onReload={refresh}
        />
      )}
    </>
  );
};
