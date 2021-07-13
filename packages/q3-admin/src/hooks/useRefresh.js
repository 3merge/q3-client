import React from 'react';
import { debounce } from 'lodash';
import { object } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';
import { makeEventName } from './useServerSideEvents';
import {
  addDocumentListener,
  removeDocumentListener,
} from './useNotificationsEvent';

export default (onChange, debounceValue = 15000) => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const handleWatch = debounce((e) => {
    if (!onChange) return null;

    return object.noop(
      onChange(window?.location?.search, e?.data),
    );
  }, debounceValue);

  React.useEffect(() => {
    const event = makeEventName(collectionName);
    addDocumentListener(event, handleWatch);

    return () => {
      removeDocumentListener(event, handleWatch);
    };
  }, [collectionName, id]);
};
