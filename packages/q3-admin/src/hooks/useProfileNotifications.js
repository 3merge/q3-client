import { includes } from 'lodash';
import { array } from 'q3-ui-helpers';
import useNotificationsPreferenceOptions from './useNotificationsPreferenceOptions';
import useProfileNotificationsInternalStore from './useProfileNotificationsInternalStore';

const useProfileNotifications = (variant, options) => {
  const { initialValues, onSubmit } =
    useProfileNotificationsInternalStore(options);

  const listens = array.is(initialValues?.listens);

  const listensOptions =
    useNotificationsPreferenceOptions(variant);

  const { forChange, forKeep } = listens.reduce(
    (acc, curr) => {
      if (
        // either all notifications are triggered together (legacy)
        // or we're matching with a particular channel (e.g. native,email,.etc)
        // and that the existing notification preference can be modified
        (!variant || String(curr).endsWith(variant)) &&
        includes(listensOptions, curr)
      )
        acc.forChange.push(curr);
      else acc.forKeep.push(curr);
      return acc;
    },
    {
      forChange: [],
      forKeep: [],
    },
  );

  const objectToArray = (xs) =>
    Object.entries(xs).reduce((acc, [key, value]) => {
      if (String(value) === 'true') acc.push(key);
      return acc;
    }, []);

  return {
    listens,
    listensOptions,

    initialValues: listensOptions.reduce((acc, curr) => {
      acc[curr] = includes(forChange, curr);
      return acc;
    }, {}),

    onSubmit: (values = {}) =>
      onSubmit({
        listens: forKeep
          .concat(objectToArray(values))
          .sort(),
      }),
  };
};

export default useProfileNotifications;
