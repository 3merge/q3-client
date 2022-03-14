import React from 'react';
import {
  filter,
  forEach,
  get,
  size,
  isNil,
  isString,
  isFunction,
  some,
} from 'lodash';
import { useNavigate } from '@reach/router';
import { browser } from 'q3-ui-helpers';

const useNotificationClickEvent = (data, callback) => {
  const [link, setLink] = React.useState();
  const navigate = useNavigate();

  const has =
    (a = []) =>
    (xs) =>
      some(a, (item) => {
        const v = get(xs, item);
        return !isNil(v) && isString(v) && size(v);
      });

  const isOutboundUrl = (xs) =>
    xs.startsWith('http') || xs.startsWith('//');

  forEach(
    filter(data, has(['localUrl', 'url'])),
    (item) => {
      const { acknowledge, hasSeen, localUrl, url } = item;
      // due to some api changes
      const resolvedUrl = localUrl || url;

      Object.assign(item, {
        url: resolvedUrl,
        onClick(e) {
          e.preventDefault();
          e.stopPropagation();

          if (!hasSeen && isFunction(acknowledge))
            acknowledge();

          setLink(resolvedUrl);
        },
      });
    },
  );

  React.useEffect(() => {
    if (link && browser.isBrowserReady())
      callback()
        .then(() => {
          setLink(null);

          if (isOutboundUrl(link)) {
            window.open(link, '_blank').focus();
          } else {
            navigate(link);
          }
        })
        .catch(() => {
          // noop
        });
  }, [link]);
};

export default useNotificationClickEvent;
