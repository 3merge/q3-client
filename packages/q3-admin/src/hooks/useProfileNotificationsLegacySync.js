import React from 'react';
import { includes, forEach, size, some } from 'lodash';
import useProfileNotifications from './useProfileNotifications';

const useProfileNotificationsLegacySync = (channels) => {
  const {
    listens = [],
    listensOptions = [],
    onSubmit,
  } = useProfileNotifications();

  const [init, setInit] = React.useState(
    size(channels) > 0 && size(listens) > 0
      ? some(listens, (item) => includes(item, '__'))
      : true,
  );

  const addChannelsToListenValues = () =>
    listens.reduce((acc, curr) => {
      const forEachChannel = (cb) =>
        forEach(channels, (channel) => {
          cb(`${curr}__${channel}`);
        });

      if (listensOptions.includes(curr))
        forEachChannel((k) => {
          acc[k] = true;
        });
      else
        forEachChannel((k) => {
          if (listensOptions.includes(k)) {
            acc[k] = true;
          }
        });

      return acc;
    }, {});

  React.useEffect(() => {
    if (!init)
      onSubmit(addChannelsToListenValues())
        .then(() => setInit(true))
        .catch(() =>
          // eslint-disable-next-line
          alert(
            "The system encountered an issue loading your notification preferences. Please re-enable the notifications you'd like to receive using the form(s) below.",
          ),
        );
  }, [init]);

  return init;
};

export default useProfileNotificationsLegacySync;
