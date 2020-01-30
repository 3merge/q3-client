import { get } from 'lodash';
import useRest from '../useRest';

export default ({ coll, fields, query, ...rest }) => {
  const fieldString = `collectionName=${coll}&${fields
    .map((field) => `fields[]=${field}`)
    .join('&')}`;

  const state = useRest({
    url: `/search?${fieldString}`,
    runOnInit: true,
    key: 'fields',
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
