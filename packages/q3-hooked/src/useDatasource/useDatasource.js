import React from 'react';
import useRest from 'q3-ui-rest';
import { get, pick } from 'lodash';
import { Definitions } from '../context';

const slugify = (v, id) => (id ? `/${v}/${id}` : `/${v}`);

const invokeFnWithCallback = (fn, args, done) => {
  if (typeof fn === 'function') {
    const f = fn(args);
    if (f && (f instanceof Promise || 'then' in f)) {
      f.then(done);
    } else {
      done();
    }
  }
};

export default ({ select, onEnter, onExit, onInit }) => {
  const {
    id,
    resourceNameSingular,
    collectionName,
    resourceName,
    location,
  } = React.useContext(Definitions);

  const [hasEntered, setHasEntered] = React.useState(false);

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
    if (state.fetching) {
      setHasEntered(false);
      if (onInit) onInit();
    }

    if (!state.fetching && onEnter)
      invokeFnWithCallback(onEnter, state, () =>
        setHasEntered(true),
      );
    else if (!state.fetching) setHasEntered(true);

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

  return {
    ...state,
    hasEntered,
    data,

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
      data: Array.isArray(data)
        ? data.map((item) => ({
            ...item,
            url: `${resourceName}/${item.id}`,
          }))
        : data,
      ...pick(state, [
        'total',
        'hasNextPage',
        'hasPrevPage',
      ]),
    },
  };
};
