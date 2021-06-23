import { compact, round, last } from 'lodash';

const getOp = (num) => (num > 0 ? '+' : '');

const makeNumber = (xs) => {
  const num = Number(xs);
  return parseFloat(
    (Number.isFinite(num) && !Number.isNaN(num)
      ? num
      : 0
    ).toFixed(12),
  );
};

const multiplyBy100 = (num) => num * 100;

const joinWithPercentSign = (...params) =>
  compact(params.concat('%')).join('');

const ensureNumberParams = (fn) => (...params) =>
  fn(...params.map(makeNumber));

export const compare = ensureNumberParams((curr, prev) => {
  if (prev === 0) return 'n/a';

  const percent = round(
    multiplyBy100((curr - prev) / prev),
  );

  return joinWithPercentSign(
    getOp(percent),
    String(percent).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  );
});

export const getFirstFromSpec = (
  legend,
  defaultValue = null,
) => (xs) =>
  last(
    Object.entries(legend).find(([key]) =>
      String(xs).startsWith(key),
    ),
  ) || defaultValue;
