import React from 'react';
import { object } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import { Dispatcher, Store } from '../containers/state';

const useDetailRegisterFunction = (fn) => {
  const { t } = useTranslation();
  const dispatchers = React.useContext(Dispatcher);
  const { data } = React.useContext(Store);

  return object.hasKeys(data) && object.isFn(fn)
    ? fn(data, dispatchers, t)
    : [];
};

export default useDetailRegisterFunction;
