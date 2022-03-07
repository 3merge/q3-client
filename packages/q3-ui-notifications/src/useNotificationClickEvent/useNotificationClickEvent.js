import React from 'react';
import {
  filter,
  forEach,
  get,
  size,
  isNil,
  isString,
  isFunction,
} from 'lodash';
import { useNavigate } from '@reach/router';
import { browser } from 'q3-ui-helpers';

const useNotificationClickEvent = (data, callback) => {
  const [link, setLink] = React.useState();
  const navigate = useNavigate();

  const hasUrl = (xs) => {
    const url = get(xs, 'url');
    return !isNil(url) && isString(url) && size(url);
  };

  const isOutboundUrl = (xs) =>
    xs.startsWith('http') || xs.startsWith('//');

  forEach(filter(data, hasUrl), (item) => {
    const { acknowledge, hasSeen, url } = item;

    Object.assign(item, {
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!hasSeen && isFunction(acknowledge))
          acknowledge();
        setLink(url);
      },
    });
  });

  React.useEffect(() => {
    if (link && browser.isBrowserReady())
      callback()
        .then(() => {
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
