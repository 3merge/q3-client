import { get, uniq } from 'lodash';
import * as string from './string';

const YOUTUBE_REGEX =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

const isString = (v = '') =>
  typeof v === 'string' ? v : String(v);

export const removeLeadingQueryCharacter = (v = '') =>
  String(v).charAt(0) === '?' ? v.substr(1) : v;

export const checksArray = (name) =>
  name &&
  (name.endsWith('.') ||
    name.endsWith('.0') ||
    name.endsWith('%2E0'))
    ? `${name.replace(/\./g, '%2Elength')}`
    : name;

export const decode = (name) =>
  isString(name)
    .replace(/%2E/g, '.')
    .replace(/length/g, '0')
    .replace(/%21/g, '!')
    .replace(/%3C/g, '<')
    .replace(/%3E/g, '>')
    .replace(/%20/g, ' ')
    .replace(/%5F/g, '_')
    .replace(/%2C/g, ',')
    .replace(/%2B/g, '+')
    .replace(/%40/g, '@');

export const encode = (name) =>
  isString(name)
    .replace(/[^a-zA-Z0-9 !%_.><=\s+,@]/g, '')
    .replace(/\./g, '%2E')
    .replace(/!/g, '%21')
    .replace(/_/g, '%5F')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s/g, '%20')
    .replace(/,/, '%2C')
    .replace(/%2E0/g, '%2Elength');

/**
 * Retrieves default youtube preview thumbnail and embed.
 */
export const getYoutube = (url = '') => {
  if (!isString(url)) throw new Error('URL required');
  const part = get(url.match(YOUTUBE_REGEX), '[2]');

  return part
    ? {
        thumbnail: `https://img.youtube.com/vi/${part}/0.jpg`,
        embed: `//www.youtube.com/embed/${part}`,
      }
    : {
        thumbnail: null,
        embed: null,
      };
};

export const forEachParam = (instance) => {
  const output = {};

  try {
    // eslint-disable-next-line
    for (const pair of instance.entries()) {
      // eslint-disable-next-line
      output[pair[0]] = pair[1];
    }
  } catch (e) {
    // noop
  }

  return output;
};

export const toParamsString = (paramsInstance) => {
  const output = forEachParam(paramsInstance);
  return Object.entries(output)
    .map(([key, value]) => {
      const left = encodeURIComponent(key);
      return value
        ? `${left}=${encodeURIComponent(value)}`
        : left;
    })
    .join('&');
};

export const ensureSingleQueryCharacter = (str) =>
  str.replace(/^(\?\?|\?&|&)/, '?');

export const replaceParamValueInSearchString = (
  originalSearchString,
  param,
  value,
) => {
  if (!isString(value)) return originalSearchString;

  const str = String(originalSearchString);
  const part = `${param}=${value}`;

  let output;

  if (string.isStringEmpty(str)) output = `?${part}`;
  else if (originalSearchString.includes(param))
    output = uniq(
      originalSearchString
        .replace(new RegExp(`${param}=([^&]*)`, 'g'), part)
        .split('&'),
    ).join('&');
  else output = `${originalSearchString}&${part}`;
  return ensureSingleQueryCharacter(output);
};
