import React from 'react';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { Store, Definitions } from '../state';
import { SocketContext } from '../Socket';
import PollIndicator from '../../components/PollIndicator';
import PendingChangesModal from '../../components/PendingChangesModal';

// the HOC is important so that we don't re-paint the socket on change detection
export default () => {
  const {
    broadcast,
    join,
    leave,
    watch,
  } = React.useContext(SocketContext);
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);
  const [showRefresh, setShowRefresh] = React.useState(
    false,
  );

  const [hasChange, setHasChange] = React.useState(false);
  const [hasPending, setHasPending] = React.useState(false);
  const [init, setInit] = React.useState(false);

  const { id, updatedAt } = data;
  const args = { id, collectionName };

  const refresh = () => {
    if (typeof window !== 'undefined')
      window.location.reload();
  };

  const prompt = () => {
    setHasPending(true);
    setShowRefresh(true);
  };

  const decline = () => {
    setShowRefresh(false);
  };

  const compareTimeStamps = React.useCallback(
    (datestamp) => {
      setTimeout(() => {
        if (
          datestamp &&
          moment(updatedAt).isBefore(moment(datestamp))
        )
          prompt();
      }, 7500);
    },
    [updatedAt],
  );

  React.useEffect(() => {
    let timer;

    join(args, compareTimeStamps);

    watch(() => {
      timer = setTimeout(() => {
        prompt();
      }, 5000);
    });

    return () => {
      if (timer) clearTimeout(timer);
      leave(args);
    };
  }, [id, collectionName]);

  React.useEffect(() => {
    if (init) {
      setHasPending(false);
      broadcast({
        updatedAt,
        ...args,
      });
    } else {
      setInit(true);
    }
  }, [updatedAt]);

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
        hasPendingUpdate={hasPending}
        hasChange={hasChange}
      />
      {showRefresh && (
        <PendingChangesModal
          onDecline={decline}
          onReload={refresh}
        />
      )}
    </>
  );
};
