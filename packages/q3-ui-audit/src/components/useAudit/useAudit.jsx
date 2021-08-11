import React from 'react';
import axios from 'axios';
import { compact, size } from 'lodash';
import { useQueryParams } from 'q3-ui-queryparams';
import { castToEnd } from 'q3-ui-forms/lib/helpers';

const HANDLE_ERROR = 'handle-error';
const INCREMENT_SKIP = 'increment-skip';
const INIT_FETCHING = 'init-fetching';
const UPDATE_DATA = 'update-data';
const RESET_SKIP = 'reset-skip';

export const reducerDispatcher = (state, context) => {
  const newState = { ...state };
  const { action, data } = context;

  switch (action) {
    case INCREMENT_SKIP:
      newState.skip += 1;
      break;

    case INIT_FETCHING:
      newState.loading = true;
      break;

    case HANDLE_ERROR:
      newState.error = true;
      newState.loading = false;
      break;

    case UPDATE_DATA:
      newState.error = false;
      newState.data =
        newState.skip === 0
          ? data
          : compact(newState.data.concat(data));
      newState.hasMore = size(data) === 150;
      newState.loading = false;
      break;

    case RESET_SKIP:
      newState.skip = 0;
      break;

    default:
      break;
  }

  return newState;
};

export default (filters = {}) => {
  const qp = useQueryParams();
  const [state, reduce] = React.useReducer(
    reducerDispatcher,
    {
      data: [],
      hasMore: false,
      error: false,
      loading: true,
      skip: 0,
    },
  );

  const activeQueryString = qp.encode({
    ...filters,
    // although we sometimes use form casters for this
    // we need to account for the default value
    date: castToEnd(filters.date),
    skip: state.skip,
  });

  React.useEffect(() => {
    reduce({
      action: RESET_SKIP,
    });
  }, [filters]);

  React.useEffect(() => {
    reduce({
      action: INIT_FETCHING,
    });

    return axios
      .get(['/audit', activeQueryString].join(''))
      .then((resp) =>
        reduce({
          action: UPDATE_DATA,
          data: resp?.data?.changes,
        }),
      )
      .catch(() =>
        reduce({
          action: HANDLE_ERROR,
        }),
      );
  }, [activeQueryString]);

  return {
    ...state,
    getMore() {
      reduce({
        action: INCREMENT_SKIP,
      });
    },
  };
};
