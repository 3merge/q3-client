import React from 'react';
import { get } from 'lodash';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import { browser } from 'q3-ui-helpers';
import { Store, Definitions } from '../state';
import PollIndicator from '../../components/PollIndicator';
import { useActiveRequests, useSocket } from '../../hooks';

const UnsavedChanges = () => {
  const { data } = React.useContext(Store);
  const [
    hasPendingUpdate,
    setHasPendingUpdate,
  ] = React.useState(false);
  const [hasChange, setHasChange] = React.useState(false);

  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const previousLastUpdated = get(data, 'updatedAt');
  const numberOfActiveRequests = useActiveRequests();
  const { lastUpdated } = useSocket(collectionName, id);

  let timer;

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
      numberOfActiveRequests === 0 &&
      (moment(lastUpdated).isAfter(
        moment(previousLastUpdated),
      ) ||
        !previousLastUpdated)
    ) {
      confirm('There is a new version');
    }

    return () => {
      timer = null;
    };
  }, [
    previousLastUpdated,
    numberOfActiveRequests,
    lastUpdated,
  ]);

  React.useEffect(() => {
    if (hasPendingUpdate)
      timer = setTimeout(() => {
        window.location.reload();
      }, 5000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasPendingUpdate]);

  return (
    <Box
      style={{ backgroundColor: '#FFF' }}
      height="45px"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      width={320}
    >
      <PollIndicator
        hasPendingUpdate={hasPendingUpdate}
        lastUpdated={lastUpdated}
        hasChange={hasChange}
        close={() => {
          clearTimeout(timer);
          setHasPendingUpdate(false);
        }}
      />
    </Box>
  );
};

export default UnsavedChanges;
