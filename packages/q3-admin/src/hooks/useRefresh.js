import React from 'react';
import { debounce } from 'lodash';
import { Definitions } from '../containers/state';
import { makeEventName } from './useServerSideEvents';
import { invokeDocumentListener } from './useNotifications';

const noop = () => null;

export default (onChange, debounceValue = 15000) => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const handleWatch = debounce((e) => {
    if (!onChange) return null;

    return onChange(window?.location?.search, e?.data)
      .then(noop)
      .catch(noop);
  }, debounceValue);

  React.useEffect(() => {
    const event = makeEventName(collectionName);
    invokeDocumentListener(event, handleWatch);

    return () => {
      invokeDocumentListener(event);
    };
  }, [collectionName, id]);
};
