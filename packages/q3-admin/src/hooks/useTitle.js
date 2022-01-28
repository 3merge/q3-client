import { get } from 'lodash';
import { object, string } from 'q3-ui-helpers';

const { ellipsis } = string;
const { isFn } = object;

export default (
  state,
  { parenthesesProp, titleProp, titleRenderer },
) => {
  let title = '';

  if (titleProp) title += ellipsis(get(state, titleProp));
  if (parenthesesProp)
    title += ` (${get(state, parenthesesProp)})`;

  return isFn(titleRenderer) ? titleRenderer(state) : title;
};
