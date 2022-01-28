import React from 'react';
import {
  isObject,
  size,
  uniqWith,
  isEqual,
  get,
  capitalize,
} from 'lodash';
import { array } from 'q3-ui-helpers';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { useTranslation } from 'q3-ui-locale';

export const combine = (a, b) =>
  uniqWith(a.concat(b), isEqual);

export const getKeys = (o) =>
  isObject(o) ? Object.keys(o).map(String) : [];

export const findLabelByValue = (
  a,
  id,
  defaultValue = undefined,
) =>
  id
    ? array
        .is(a)
        .find(
          (item) =>
            isObject(item) &&
            String(item.value) === String(id),
        )?.label || defaultValue
    : defaultValue;

export const findMissingKeys = (o = {}, a = []) => {
  const keys = getKeys(o);
  return array.is(a).reduce((acc, curr) => {
    if (!curr?.label && !keys.includes(String(curr?.value)))
      acc.push(curr.value);

    return acc;
  }, []);
};

export const transformResultsIntoKeyValuePairs = (a) =>
  array.is(a).reduce((acc, curr) => {
    if (isObject(curr))
      acc[curr.value] = curr.label || '--';

    return acc;
  }, {});

export const reducer = (state, action) => {
  const { payload, type } = action;
  const { cache = {}, results = [] } = state;

  const setLoadingValue = (newLoadingValue) => ({
    ...state,
    loading: newLoadingValue,
  });

  switch (type) {
    case 'cache':
      return {
        cache: {
          ...cache,
          ...payload,
        },
        loading: false,
        results,
      };
    case 'data':
      return {
        cache: {
          ...cache,
          ...transformResultsIntoKeyValuePairs(payload),
        },
        loading: false,
        results: combine(results, payload),
      };
    case 'start':
      return setLoadingValue(true);
    default:
      throw new Error();
  }
};

const useObjectIdLabels = (...params) => {
  const { t } = useTranslation('labels');
  const [state, dispatch] = React.useReducer(reducer, {
    results: [],
    cache: {},
    loading: false,
  });

  const buildRequest = (ids) => {
    const [endpoint, ...rest] = params;
    return getSafelyForAutoCompleteWithProjection(
      size(ids)
        ? `${endpoint}&_id=${ids.join(',')}`
        : endpoint,
      ...rest,
    );
  };

  const buildCache = (ids = []) => {
    if (!size(ids)) return;

    dispatch({
      type: 'start',
    });

    buildRequest(ids)().then((res) => {
      dispatch({
        type: 'cache',
        payload: ids.reduce((acc, curr) => {
          acc[curr] = findLabelByValue(
            res,
            curr,
            capitalize(t('unknown')),
          );

          return acc;
        }, {}),
      });
    });
  };

  return {
    state,

    getLabelFromState: (v) => {
      const out = array.is(v).map((value) => ({
        label:
          findLabelByValue(state.results, value) ||
          get(state.cache, value, ''),
        value,
      }));

      if (!state.loading) {
        buildCache(findMissingKeys(state.cache, out));
      }

      return size(out) === 1 ? out[0] : out;
    },

    getResults: (e) =>
      buildRequest()(e).then((payload) => {
        dispatch({
          type: 'data',
          payload,
        });

        return payload;
      }),
  };
};

export default useObjectIdLabels;
