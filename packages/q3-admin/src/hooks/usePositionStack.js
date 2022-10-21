import React from 'react';
import {
  compact,
  first,
  size,
  isString,
  isObject,
  pick,
} from 'lodash';

export const printValues = (xs) => {
  let output = [];

  if (Array.isArray(xs)) output = xs;
  if (isObject(xs)) output = Object.values(xs);
  return compact(output).join(' ');
};

const usePositionStack = (addressObj) => {
  const [coordinates, setCoordinates] = React.useState([]);

  const getCoordinatePair = (query) =>
    query && isString(query)
      ? fetch(
          `https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2&q=${encodeURIComponent(
            query,
          )}`,
        )
          .then((resp) => resp.json())
          .then((data) => {
            const match = first(data);
            return [Number(match.lat), Number(match.lon)];
          })
          .catch(() => [])
      : Promise.resolve([]);

  const attempt = (format) => {
    let query = [];

    if (format === 'full')
      query = Object.values(
        pick(addressObj, [
          'streetNumber',
          'streetLine1',
          'streetLine2',
          'city',
          'region',
          'country',
          'postal',
        ]),
      );
    else if (format === 'truncated')
      query = Object.values(
        pick(addressObj, [
          'streetNumber',
          'streetLine1',
          'city',
          'region',
          'country',
        ]),
      );
    else if (format === 'simple')
      query = Object.values(
        pick(addressObj, [
          'streetLine1',
          'city',
          'region',
          'country',
        ]),
      );

    return getCoordinatePair(printValues(query));
  };

  const reattempt = (format) => (xs) =>
    size(xs) ? xs : attempt(format);

  React.useEffect(() => {
    attempt('full')
      .then(reattempt('truncated'))
      .then(reattempt('simple'))
      .then(setCoordinates);
  }, [addressObj]);

  return coordinates;
};

export default usePositionStack;
