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

  // decided to replace dotnotation for the forms components sake
  // the tilda is used in other places too
  const fieldString = `collectionName=${coll}&${fields
    .map(
      (field) =>
        `fields[]=${encodeURIComponent(
          field.replace(/~/gi, '.'),
        )}`,
    )
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
