import React from 'react';
import {
  compact,
  first,
  size,
  isString,
  isObject,
  pick,
} from 'lodash';
import { browser } from 'q3-ui-helpers';

export const printValues = (xs) => {
  let output = [];
  if (Array.isArray(xs)) output = xs;
  if (isObject(xs)) output = Object.values(xs);
  return compact(output).join(' ');
};

export const shapeAddressQueryString = (
  addressObj,
  shape,
) => {
  let query = [];

  if (shape === 'full')
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
  else if (shape === 'truncated')
    query = Object.values(
      pick(addressObj, [
        'streetNumber',
        'streetLine1',
        'city',
        'region',
        'country',
      ]),
    );
  else if (shape === 'simple')
    query = Object.values(
      pick(addressObj, [
        'streetLine1',
        'city',
        'region',
        'country',
      ]),
    );

  return printValues(query);
};

const usePositionStack = (addressObj) => {
  const [coordinates, setCoordinates] = React.useState([]);

  const getCoordinatePair = (query) =>
    query && isString(query)
      ? browser
          .fetchJson(
            `https://nominatim.openstreetmap.org/search.php?polygon_geojson=1&format=jsonv2&q=${encodeURIComponent(
              query,
            )}`,
          )
          .then((data) => {
            const match = first(data);
            return [Number(match.lat), Number(match.lon)];
          })
          .catch(() => [])
      : Promise.resolve([]);

  const attempt = (shape) =>
    getCoordinatePair(
      shapeAddressQueryString(addressObj, shape),
    );

  const reattempt = (shape) => (xs) =>
    size(xs) ? xs : attempt(shape);

  React.useEffect(() => {
    attempt('full')
      .then(reattempt('truncated'))
      .then(reattempt('simple'))
      .then(setCoordinates);
  }, [addressObj]);

  return coordinates;
};

export default usePositionStack;
