import { isString, last, size } from 'lodash';

export const IMAGE_EXT_LIST = [
  'JPEG',
  'JPG',
  'PNG',
  'GIF',
  'TIFF',
  'SVG',
];

export const fetchUrlAsBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () =>
      resolve(reader.result),
    );

    reader.addEventListener('error', (e) => reject(e));
    reader.readAsDataURL(blob);
  });
};

export const getFileType = (url) => {
  if (!url || !isString(url)) return null;

  const u = new URL(url);
  u.hash = '';
  u.search = '';

  const str = last(u.toString().split('.'));
  return isString(str) && size(str) && str !== 'undefined'
    ? str.toUpperCase()
    : null;
};

export const makePrivateKey = (str = undefined) =>
  `__${String(str || null)}__`;

export const toMbs = (bytes = 0) =>
  `${Number(bytes / 1024 ** 2).toFixed(2)}mbs`;
