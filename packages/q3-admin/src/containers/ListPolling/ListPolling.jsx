import React from 'react';
import moment from 'moment';
import { Store, Definitions } from '../state';
import { SocketContext } from '../Socket';

export default ({ poll }) => {
  const { join, leave, watch } = React.useContext(
    SocketContext,
  );
  const { collectionName } = React.useContext(Definitions);
  const { data } = React.useContext(Store);

  const { updatedAt } = data;
  const args = { collectionName };

  const handlePoll = () => {
    poll().then(() => {
      // noop
    });
  };

  const compareTimeStamps = React.useCallback(
    (datestamp) => {
      setTimeout(() => {
        if (
          datestamp &&
          moment(updatedAt).isBefore(moment(datestamp))
        )
          handlePoll();
      }, 7500);
    },
    [updatedAt],
  );

  React.useEffect(() => {
    let timer;

    join(args, compareTimeStamps);

    watch(() => {
      timer = setTimeout(handlePoll, 5000);
    });

    return () => {
      if (timer) clearTimeout(timer);
      leave(args);
    };
  }, [collectionName, updatedAt]);

  return null;
};
