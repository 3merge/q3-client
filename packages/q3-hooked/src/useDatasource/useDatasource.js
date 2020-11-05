import React from 'react';
import useRest from 'q3-ui-rest';
import { get, pick } from 'lodash';
import { Definitions } from '../context';

export default ({ select, onEnter, onExit, onInit }) => {
  const {
    id,
    resourceNameSingular,
    collectionName,
    resourceName,
    location,
  } = React.useContext(Definitions);

  const [hasEntered, setHasEntered] = React.useState(
    !onEnter && !onInit,
  );

  return {};

  const url = slugify(collectionName, id);

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    select,
    runOnInit: true,
    location,
    url,
  });

  const data = id
    ? get(state, resourceNameSingular, {})
    : get(state, resourceName, []);

  React.useEffect(() => {
    if (state.fetching && onInit) onInit();
    if (!state.fetching && !hasEntered)
      invokeFnWithCallback(onEnter, state, () =>
        setHasEntered(true),
      );

    return () => {
      if (
        !state.fetching &&
        hasEntered &&
        onExit &&
        onEnter
      ) {
        onExit(state);
        setHasEntered(false);
      }
    };
  }, [hasEntered, state.fetching, url]);

  // hasError
  // ALL RENAME THE DATASOURCE STUFF>..

  return {
    ...state,
    hasEntered,

    operations: pick(state, [
      'get',
      'poll',
      'remove',
      'removeBulk',
      'patch',
      'put',
      'post',
    ]),

    store: {
      data,
      ...pick(state, [
        'total',
        'hasNextPage',
        'hasPrevPage',
      ]),
    },
  };
};
