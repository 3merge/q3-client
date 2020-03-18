import axios from 'axios';
import { get } from 'lodash';

export const extractData = (v, path) => {
  let label;
  let value;

  if (typeof v === 'object' && v !== null) {
    label = get(v, path);
    value = get(v, 'id', label);
  } else {
    label = v;
    value = v;
  }

  return {
    label,
    value,
    ...v,
  };
};

export const getPathOrExtractPathFromObject = (
  useGet,
  path,
) => (target) =>
  useGet ? get(target, path) : extractData(target, path);

export const handleResponse = (
  key,
  nestedKey,
  returnAsNonExtractedData = false,
) => ({ data }) =>
  nestedKey
    ? get(data, key, []).map(
        getPathOrExtractPathFromObject(
          returnAsNonExtractedData,
          nestedKey,
        ),
      )
    : get(data, key, []);

export default (url, ...rest) =>
  axios
    .get(url)
    .then(handleResponse(...rest))
    .catch(() => {
      return [];
    });
