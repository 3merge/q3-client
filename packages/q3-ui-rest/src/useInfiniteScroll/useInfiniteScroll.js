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

  // assumes useRest already ran for 0
  const initialPageValue = 1;
  const [page, setPage] = React.useState(initialPageValue);
  const [cache, setCache] = React.useState([]);
  const [stop, setStop] = React.useState(false);
  const q = enforceQueryString(location?.search);

  React.useLayoutEffect(() => {
    setCache(mergeUniq(data, cache));
  }, [data]);

  React.useLayoutEffect(() => {
    setCache([]); // different data set altogether
    setPage(initialPageValue);
    setStop(false);
  }, [q]);

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
              compact([q, `page=${page}`]).join('&'),
            ).then((r) => {
              if (r?.hasNextPage === false) {
                setStop(true);
              }

              setPage(page + 1);
            }),
          );
        }
      },
      { threshold: [0] },
    );

    timer = setTimeout(() => {
      runObserver('observe');
    }, 2500);

    return disconnect;
  }, [page, q]);

  return {
    data: cache,
    scrollWatchRef: ref,
    showScrollWatch: !stop && hasNextPage,
  };
};

export default useInfiniteScroll;
