import { decode, encode, prepend } from '../helpers';

export default () => ({
  decode: (string, defaultState) => ({
    ...defaultState,
    ...decode(string),
  }),
  encode: (state, options = {}) =>
    prepend(encode(state, options), '?'),
});
