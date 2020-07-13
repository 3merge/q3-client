import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { object, string } from 'q3-ui-helpers';

const { ellipsis } = string;
const { isFn } = object;

export default (
  state,
  {
    parenthesesProp,
    resourceName,
    subtitleProp,
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

  return isFn(titleRenderer)
    ? titleRenderer(state)
    : {
        title: title.length ? title : t(resourceName),
        subtitle: String(get(state, subtitleProp, '')),
      };
};
