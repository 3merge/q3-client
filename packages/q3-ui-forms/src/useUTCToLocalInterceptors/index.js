import moment from 'moment-timezone';
import axios from 'axios';
import qs from 'qs';
import flat from 'flat';
import { TIMEZONE } from '../constants';

const getTimezone = () => moment.tz.guess();

const setTimezone = (timezone) =>
  localStorage.setItem(
    TIMEZONE,
    timezone.trim() || getTimezone(),
  );

const getTimezoneFromLocalStorage = () =>
  localStorage.getItem(TIMEZONE) || getTimezone();

export const serializeDateFromUtcToLocalTime = (
  config = {},
) => {
  const newConfig = { ...config };

  newConfig.paramsSerializer = (params) =>
    qs.stringify(params, {
      serializeDate: (date) => {
        return moment
          .tz(date, getTimezoneFromLocalStorage())
          .toISOString();
      },
    });

  return newConfig;
};

export function convertUtcDateStringsToLocalTime(
  config = {},
) {
  try {
    const flattened = Object.entries(
      flat(config.data),
    ).reduce((acc, [key, value]) => {
      acc[key] = moment(
        value,
        moment.ISO_8601,
        true,
      ).isValid()
        ? moment
            .utc(value)
            .tz(getTimezoneFromLocalStorage())
            .format()
        : value;

      return acc;
    }, {});

    // eslint-disable-next-line
    config.data = flat.unflatten(flattened);
    return config;
  } catch (e) {
    return config;
  }
}

const useUTCToLocalInterceptors = (timezone) => {
  setTimezone(timezone);

  axios.interceptors.request.use(
    serializeDateFromUtcToLocalTime,
  );

  axios.interceptors.response.use(
    convertUtcDateStringsToLocalTime,
  );
};

export default useUTCToLocalInterceptors;
