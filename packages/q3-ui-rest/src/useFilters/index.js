import { get } from 'lodash';
import useRest from '../useRest';

export default ({ coll, fields, query }) => {
  let fieldString = fields
    .map((field) => `fields[]=${field}`)
    .join('&');

  if (query) {
    fieldString += query.replace('?', '&');
  }

  const state = useRest({
    url: `/search?coll=${coll}&${fieldString}`,
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
