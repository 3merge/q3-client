import { get } from 'lodash';
import { object } from 'q3-ui-helpers';

const { isFn } = object;

export default (
  state,
  { parenthesesProp, titleProp, titleRenderer },
) => {
  let title = '';

  if (titleProp) title += get(state, titleProp);
  if (parenthesesProp)
    title += ` (${get(state, parenthesesProp)})`;

  return isFn(titleRenderer) ? titleRenderer(state) : title;
};
