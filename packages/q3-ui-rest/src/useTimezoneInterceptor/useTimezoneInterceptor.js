import axios from 'axios';
import qs from 'qs';
import flat from 'flat';
import { timezone } from 'q3-ui-locale';
import React from 'react';

export const serializeDateFromUtcToLocalTime = (
  config = {},
) => {
  const newConfig = { ...config };

  newConfig.paramsSerializer = (params) =>
    qs.stringify(params, {
      serializeDate: timezone.toUtc,
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
      acc[key] = timezone.isUtc(value)
        ? timezone.toLocal(value)
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

const useUTCToLocalInterceptors = (preferredTimezone) => {
  timezone.setTimezone(preferredTimezone);

  React.useLayoutEffect(() => {
    const req = axios.interceptors.request.use(
      serializeDateFromUtcToLocalTime,
    );

    const res = axios.interceptors.response.use(
      convertUtcDateStringsToLocalTime,
    );

    return () => {
      axios.interceptors.request.eject(req);
      axios.interceptors.response.eject(res);
    };
  }, []);
};

export default useUTCToLocalInterceptors;
