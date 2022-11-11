import React from 'react';
import {
  first,
  compact,
  uniqBy,
  invoke,
  size,
} from 'lodash';
import { object } from 'q3-ui-helpers';

export const mergeUniq = (a, b) =>
  uniqBy(compact([a, b].flat(2)), 'id');

export const enforceQueryString = (str) =>
  !String(str).startsWith('?') && size(str)
    ? `?${str}`
    : str;

const useInfiniteScroll = ({
  data,
  hasNextPage = false,
  poll,
  location = {},
}) => {
  const ref = React.useRef();
  const [page, setPage] = React.useState(1);
  const [cache, setCache] = React.useState([]);

  React.useLayoutEffect(() => {
    setCache(mergeUniq(data, cache));
  }, [data]);

  React.useEffect(() => {
    let observer;
    let timer;

    const runObserver = (method) => {
      if (ref.current)
        invoke(observer, method, ref.current);
    };

    const disconnect = () => {
      try {
        runObserver('unobserve');
        clearTimeout(timer);
      } catch (e) {
        // noop
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (first(entries)?.isIntersecting === true) {
          disconnect();

          object.noop(
            poll(
              compact([
                enforceQueryString(location?.search),
                `page=${page}`,
              ]).join('&'),
            ),
          );

          setPage(page + 1);
        }
      },
      { threshold: [0] },
    );

    timer = setTimeout(() => {
      runObserver('observe');
    }, 2500);

    return disconnect;
  }, [page]);

  return {
    data: cache,
    scrollWatchRef: ref,
    showScrollWatch: hasNextPage,
  };
};

export default useInfiniteScroll;
