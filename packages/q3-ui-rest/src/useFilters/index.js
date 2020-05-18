import { get } from 'lodash';
import useRest from '../useRest';

export default ({
  runOnInit = true,
  coll,
  fields,
  query,
}) => {
  if (!fields || !Array.isArray(fields) || !fields.length)
    return {};

  const fieldString = `collectionName=${coll}&${fields
    .map((field) => `fields[]=${field}`)
    .join('&')}`;

  const state = useRest({
    url: `/search?${fieldString}${
      query ? `&${query.replace('?', '')}` : ''
    }`,
    key: 'fields',
    runOnInit,
  });

  return {
    ...state,
    getOptions: (name) =>
      get(state, `fields.${name}`, []).map((value) => ({
        label: value,
        value,
      })),
  };
};
