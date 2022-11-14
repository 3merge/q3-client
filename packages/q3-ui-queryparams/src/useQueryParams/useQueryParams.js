import { decode, encode, prepend } from '../helpers';

export default () => ({
  decode: (string, defaultState, options) => ({
    ...defaultState,
    ...decode(string, options),
  }),
  encode: (state, options = {}) =>
    prepend(encode(state, options), '?'),
});
