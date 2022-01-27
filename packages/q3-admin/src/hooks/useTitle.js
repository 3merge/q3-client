import { get } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { object, string } from 'q3-ui-helpers';

const { ellipsis } = string;
const { isFn } = object;

export default (
  state,
  {
    parenthesesProp,
    resourceName,
    titleProp,
    titleRenderer,
  },
) => {
  const { t } = useTranslation('titles');

  let title = '';

  // pull from state value
  if (titleProp) title += ellipsis(get(state, titleProp));

  // append more text if required
  if (parenthesesProp)
    title += ` (${get(state, parenthesesProp)})`;

  if (!title.length) title = t(resourceName);
  return isFn(titleRenderer) ? titleRenderer(state) : title;
};
