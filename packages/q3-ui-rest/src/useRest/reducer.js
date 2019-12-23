import { merge, get } from 'lodash';
import {
  FETCHING,
  FETCHED,
  UPDATED,
  CREATED,
  DELETED,
  DELETED_MANY,
} from './constants';
import { isEmpty, getFn } from '../helpers';

export default (
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
      const next = get(data, resource, {});
      const prev = { ...state };

      if (resource in prev) {
        prev[resource] = next;
      } else if (resources in prev) {
        prev[resources] = get(
          prev,
          resources,
          [],
        ).map((item) =>
          next.id === item.id ? next : item,
        );
      }

      return merge({}, prev, data);
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
              : null,
            [resources]: Array.isArray(state[resources])
              ? state[resources].filter(
                  ({ id }) => id !== data.id,
                )
              : null,
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
