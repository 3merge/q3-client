import moment from 'moment-timezone';
import { browser } from 'q3-ui-helpers';

export const YMD = 'YYYY-MM-DD';
export const TIMEZONE = 'timezone';

export const guess = () => moment.tz.guess();

export const getTimezone = () =>
  browser.proxyLocalStorageApi('getItem', TIMEZONE) ||
  guess();

export const isYmd = (value) =>
  moment(value, YMD, true).isValid();

export const isUtc = (value) =>
  typeof value !== 'number' &&
  // eslint-disable-next-line
  Number.isNaN(Number(value)) &&
  String(value).includes('T') &&
  moment(value, moment.ISO_8601, true).isValid();

export const setTimezone = (timezone = '') => {
  const value =
    typeof timezone === 'string' && timezone.trim().length
      ? timezone.trim()
      : guess();

  browser.proxyLocalStorageApi('setItem', TIMEZONE, value);
};

export const toLocal = (value, format) =>
  moment.tz(value, getTimezone()).format(format);

export const toUtc = (value) =>
  moment.tz(value, getTimezone()).toISOString();
