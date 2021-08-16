import { invoke, last } from 'lodash';

const getLastAfter = (str, char) =>
  last(String(str).split(char));

const strategies = {
  youtube: (url) =>
    `//www.youtube.com/embed/${getLastAfter(url, '?v=')}`,

  wistia: (url) =>
    `//fast.wistia.net/embed/iframe/${getLastAfter(
      url,
      '/medias/',
    )}?version=v1`,
};

export default (xs) =>
  invoke(
    strategies,
    Object.keys(strategies).find((hostname) =>
      String(xs).includes(hostname),
    ),
    xs,
  );
