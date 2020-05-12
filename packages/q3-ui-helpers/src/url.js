import { get } from 'lodash';

const YOUTUBE_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

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
    .replace(/%2C/g, ',');

export const encode = (name) =>
  isString(name)
    .replace(/[^a-zA-Z0-9 !%_.><=\s+,]/g, '')
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
