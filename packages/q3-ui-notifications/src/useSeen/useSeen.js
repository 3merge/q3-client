import React from 'react';
import { browser, object } from 'q3-ui-helpers';
import { get } from 'lodash';

export default (notification, callback) => {
  const ref = React.createRef();
  const { id, hasSeen } = notification;

  const detach = (obv) => {
    try {
      obv.unobserve(ref.current);
    } catch (e) {
      // null
    }
  };

  React.useEffect(() => {
    let timer;

    if (
      !object.isFn(callback) ||
      !browser.isBrowserReady() ||
      !ref.current
    )
      return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = get(entries, '0', {});
        if (
          get(entry, 'isIntersecting', false) === true &&
          !hasSeen
        ) {
          try {
            timer = setTimeout(() => {
              callback(entry, id);
              detach(observer);
            }, 750);
          } catch (e) {
            // noop
          }
        }
      },
      { threshold: [1] },
    );

    observer.observe(ref.current);
    return () => {
      detach(observer);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return ref;
};
