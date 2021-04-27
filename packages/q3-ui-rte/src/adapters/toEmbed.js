import { invoke, last } from 'lodash';

const strategies = {
  youtube: (url) =>
    `http://www.youtube.com/embed/${last(
      String(url).split('?v='),
    )}`,
};

export default (xs) =>
  invoke(
    strategies,
    Object.keys(strategies).find((hostname) =>
      String(xs).includes(hostname),
    ),
    xs,
  );
