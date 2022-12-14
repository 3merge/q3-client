import {
  sortBy,
  size,
  mean,
  chunk,
  isObject,
  isFunction,
  pick,
} from 'lodash';

const exp2 = (num) => num ** 2;

export const calculateDistanceOfLineOn2DPlane = (
  coordStart,
  coordEnd,
) =>
  Math.ceil(
    Math.sqrt(
      exp2(coordEnd.x - coordStart.x) +
        exp2(coordEnd.y - coordStart.y),
    ),
  );

export const convertArrayPairIntoCoordinates = ([
  x,
  y,
]) => ({
  x,
  y,
});

export const convertCoordinatesIntoArrayPair = (
  coords = {},
) => {
  const { x = 0, y = 0 } = coords;
  return [x, y];
};

export const convertDimensionsIntoCoordinates = ({
  height = 0,
  width = 0,
}) => [
  { x: 0, y: 0 },
  { x: width, y: 0 },
  { x: width, y: height },
  { x: 0, y: height },
];

export const pickAxisValues = (xs) => pick(xs, ['x', 'y']);

export const convertData32SIntoArrayPair = (data32S = []) =>
  chunk(data32S, 2).splice(0, 4);

export const normalizeCoordinateArray = (xs) => {
  if (Array.isArray(xs)) {
    if (xs.every(Array.isArray))
      return xs.map(convertArrayPairIntoCoordinates);

    if (xs.every(isObject)) return xs.map(pickAxisValues);

    return convertData32SIntoArrayPair(xs).map(
      convertArrayPairIntoCoordinates,
    );
  }

  return xs;
};

export const calculateDimensions = (coords = []) => {
  const [tl, tr, br, bl] = normalizeCoordinateArray(coords);

  return {
    height: mean([
      calculateDistanceOfLineOn2DPlane(br, tr),
      calculateDistanceOfLineOn2DPlane(bl, tl),
    ]),
    width: mean([
      calculateDistanceOfLineOn2DPlane(br, bl),
      calculateDistanceOfLineOn2DPlane(tr, tl),
    ]),
  };
};

export const calculateFourCornersOfRectangle = (
  coords = [],
) => {
  const coordsWithStats = normalizeCoordinateArray(coords)
    .splice(0, 4)
    .map((item) => ({
      ...item,
      diff: item.y - item.x,
      sum: item.x + item.y,
    }));

  const [tr, , , bl] = sortBy(coordsWithStats, 'diff');
  const [tl, , , br] = sortBy(coordsWithStats, 'sum');
  return [tl, tr, br, bl].map(pickAxisValues);
};

export const isApproximatelyTheLargestRectangle = (
  current,
  previous,
  determineSizeFn = size,
) => {
  const hasArea = () => {
    try {
      const { height, width } = calculateDimensions(
        convertData32SIntoArrayPair(current?.data32S),
      );
      return height * width > 400;
    } catch (e) {
      return false;
    }
  };

  const runSizer = (v) =>
    isFunction(determineSizeFn)
      ? determineSizeFn(v) || 0
      : 0;

  const currentSize = runSizer(current);
  const previousSize = runSizer(previous);

  return (
    current?.rows === 4 &&
    currentSize >
      // ensures we're matching against a comparable object
      (previous?.rows === 4 ? previousSize : 0) &&
    // this is an arbitrary value
    currentSize > 1 &&
    hasArea()
  );
};

export const getRefNode = (xs) =>
  xs && 'current' in xs ? xs.current || null : xs;
