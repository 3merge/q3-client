import React from 'react';

import { Dispatcher, Store } from '../containers/state';
import useProfileForm from './useProfileForm';

// this allows us to extend this functionality to any collection
// rather than just the profile state
const useProfileNotificationsInternalStore = (
  options = {},
) => {
  const { mine = true } = options;
  if (mine) return useProfileForm();

  const { data } = React.useContext(Store);
  const { patch } = React.useContext(Dispatcher);

  return {
    initialValues: data,
    onSubmit: patch(),
  };
};

export default useProfileNotificationsInternalStore;
