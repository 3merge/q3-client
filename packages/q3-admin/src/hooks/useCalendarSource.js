import React from 'react';
import moment from 'moment';
import { useNavigate } from '@reach/router';
import {
  isFunction,
  isObject,
  debounce,
  omit,
} from 'lodash';
import { castToUTC } from 'q3-ui-forms/lib/helpers';
import { useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import { url } from 'q3-ui-helpers';
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

  const ref = React.useRef();
  const { poll, patch } = React.useContext(Dispatcher);
  const { directoryPath = '/' } =
    React.useContext(Definitions);

  const qp = useQueryParams();
  const navigate = useNavigate();
  const { search, ...etc } = useLocation();

  const [backgroundEvents, setBackgroundEvents] =
    React.useState([]);

  const getEvents = debounce(
    (info) => {
      ref.current = info;
      navigate(
        `${
          etc.pathname
        }${url.replaceParamValueInSearchString(
          qp.encode({
            // unformatted root key needs to leave
            ...omit(qp.decode(search), [fromKey]),
            [`${fromKey}>`]: castToUTC(info.startStr),
            [`${toKey || fromKey}<`]: castToUTC(
              info.endStr,
            ),
          }),
          'sort',
          `-${fromKey}`,
        )}`,
      );
    },
    [500],
  );

  const getDateFromSearch = () =>
    moment(qp.decode(search)[`${fromKey}>`]).format(
      'YYYY-MM-DD',
    );

  React.useEffect(() => {
    if (String(search).includes(fromKey)) {
      const s = `${search}&limit=500`;

      if (isFunction(getBackgroundEvents))
        getBackgroundEvents(s)
          .then(setBackgroundEvents)
          .catch(() => {
            // noop
          });

      if (isFunction(poll))
        poll(s).catch(() => {
          // noop
        });
    } else if (isObject(ref.current)) {
      getEvents(ref.current);
    }
  }, [search]);

  return {
    initialDate: getDateFromSearch(),

    getEvents,
    backgroundEvents,

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
