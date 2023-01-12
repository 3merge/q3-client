import { get, forEach } from 'lodash';
import {
  FETCHING,
  FETCHED,
  UPDATED,
  CREATED,
  DELETED,
  DELETED_MANY,
} from './constants';
import { isEmpty, getFn, hasId } from '../helpers';

export default (
  // eslint-disable-next-line
  state = {},
  { type, data, err, key, pluralized },
) => {
  if (!key) {
    throw new Error('Key required for managing state');
  }

  const resource = key;
  const resources = pluralized;

  const handlers = {
    [FETCHING]() {
      return {
        fetching: true,
      };
    },

    [FETCHED]: () => ({
      ...state,
      ...data,
      fetchingError: !isEmpty(err),
      fetching: false,
      err,
    }),

    [UPDATED]() {
      const copiedState = { ...state };
      const multiOp = get(data, resources, []);
      const singleOp = get(data, resource, {});

      if (resource in copiedState)
        copiedState[resource] = singleOp;

      if (resources in copiedState) {
        if (!Array.isArray(copiedState[resources]))
          copiedState[resources] = [];

        const updateCopiedStateResources = (xs) => {
          const match = copiedState[resources].find(
            (item) => hasId(item) && item.id === xs.id,
          );

          if (match) {
            Object.assign(match, xs);
          } else {
            copiedState[resources].push(xs);
          }
        };

        forEach(multiOp, updateCopiedStateResources);
        updateCopiedStateResources(singleOp);
      }

      return {
        ...data,
        ...copiedState,
      };
    },

    [CREATED]() {
      if (isEmpty(data)) return state;
      const next = get(data, resource, {});
      const prev = { ...state };

      if (resource in prev) {
        prev[resource] = next;
      } else {
        prev[resources] = Array.isArray(state[resources])
          ? [next, ...state[resources]]
          : [next];
      }

      return prev;
    },

    /**
     * @TODO:
     * Find better solution.
     */
    [DELETED]() {
      return isEmpty(data)
        ? state
        : {
            ...state,
            [resource]: Array.isArray(state[resource])
              ? state[resource].filter(
                  ({ id }) => id !== data.id,
                )
              : state[resource],
            [resources]: Array.isArray(state[resources])
              ? state[resources].filter(
                  ({ id }) => id !== data.id,
                )
              : state[resources],
          };
    },

    /**
     * @TODO:
     * Find better solution.
     */
    [DELETED_MANY]() {
      return isEmpty(data)
        ? state
        : {
            ...state,
            [resource]: Array.isArray(state[resource])
              ? state[resource].filter(
                  ({ id }) => !data.ids.includes(id),
                )
              : null,
            [resources]: Array.isArray(state[resources])
              ? state[resources].filter(
                  ({ id }) => !data.ids.includes(id),
                )
              : null,
          };
    },
  };

  return getFn(handlers, type);
};
