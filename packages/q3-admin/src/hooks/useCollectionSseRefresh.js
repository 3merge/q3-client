import React from 'react';
import { useChangeEventListener } from 'q3-ui-sse';
import {
  Dispatcher,
  Definitions,
  Store,
} from '../containers/state';

const useCollectionSseRefresh = () => {
  const storeData = React.useContext(Store);
  const { collectionName } = React.useContext(Definitions);
  const { poll } = React.useContext(Dispatcher);

  useChangeEventListener(collectionName, () =>
    poll(storeData?.location?.search),
  );
};

export default useCollectionSseRefresh;
