import React from 'react';
import moment from 'moment';
import { useNavigate } from '@reach/router';
import { isFunction, debounce } from 'lodash';
import { castToUTC } from 'q3-ui-forms/lib/helpers';
import { useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import {
  Dispatcher,
  Definitions,
} from '../containers/state';

const useCalendarSource = (options = {}) => {
  const {
    fromKey = 'date',
    toKey,
    getBackgroundEvents,
  } = options;

  const { poll: get, patch } = React.useContext(Dispatcher);
  const { directoryPath = '/' } =
    React.useContext(Definitions);

  const qp = useQueryParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const makeQueryString = (info) =>
    `${qp.encode({
      ...qp.decode(search),
      [`${fromKey}>`]: castToUTC(info.startStr),
      [`${toKey || fromKey}<`]: castToUTC(info.endStr),
    })}&limit=500`;

  return {
    getEvents: debounce(
      (info) => get(makeQueryString(info)),
      [500],
    ),

    getBackgroundEvents(info) {
      return isFunction(getBackgroundEvents)
        ? getBackgroundEvents(makeQueryString(info))
        : [];
    },

    navigate(info) {
      info.jsEvent.preventDefault();

      if (info.event.id)
        navigate(`${directoryPath}/${info.event.id}`);
    },

    update({
      event: { id, start, end, durationEditable },
      revert,
    }) {
      const obj = {
        [fromKey]: moment(start).toISOString(),
      };

      if (
        durationEditable &&
        toKey &&
        end &&
        fromKey !== toKey
      )
        obj[toKey] = moment(end).toISOString();

      return patch(id)(obj).catch(() => {
        revert();
      });
    },
  };
};

export default useCalendarSource;
