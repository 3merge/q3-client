import React from 'react';
import { get } from 'lodash';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { Store, Definitions } from '../state';
import PollIndicator from '../../components/PollIndicator';
import {
  useActiveRequests,
  useReloadState,
  useSocket,
} from '../../hooks';

export const withLastUpdated = (Component) => (props) => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  // real-time changelog timestamp
  const { lastUpdated } = useSocket(collectionName, id);

  const hasExpired = (previousLastUpdated) =>
    !previousLastUpdated ||
    // if the value is before, it means it's out of date
    // likewise, a missing value needs to be polled
    moment(previousLastUpdated).isBefore(
      moment(lastUpdated),
    );

  return (
    <Component
      lastUpdated={lastUpdated}
      hasExpired={hasExpired}
      {...props}
    />
  );
};

// the HOC is important so that we don't re-paint the socket on change detection
export default withLastUpdated(
  ({ lastUpdated, hasExpired }) => {
    const { data } = React.useContext(Store);
    const [hasChange, setHasChange] = React.useState(false);
    const hasActiveRequests = useActiveRequests();
    const runReloadPrompt = useReloadState();
    const previousLastUpdated = get(data, 'updatedAt');

    React.useEffect(() => {
      if (browser.isBrowserReady())
        document.addEventListener(
          'q3-change-detection',
          (e) => setHasChange(!e.data),
        );
    }, []);

    React.useEffect(() => {
      if (
        lastUpdated &&
        !hasActiveRequests &&
        hasExpired(previousLastUpdated)
      )
        runReloadPrompt();
    }, [
      previousLastUpdated,
      hasActiveRequests,
      lastUpdated,
    ]);

    return (
      <PollIndicator
        hasPendingUpdate={!hasExpired(previousLastUpdated)}
        lastUpdated={lastUpdated}
        hasChange={hasChange}
      />
    );
  },
);
