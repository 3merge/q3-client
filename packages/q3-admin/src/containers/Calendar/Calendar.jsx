import React from 'react';
import FullCalendar from '@fullcalendar/react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import list from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
import moment from 'moment';
import { useNavigate } from '@reach/router';
import { isFunction, map, pick } from 'lodash';
import { Box } from '@material-ui/core';
import { castToUTC } from 'q3-ui-forms/lib/helpers';
import { useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import { Dispatcher, Store } from '../state';
import useStyle from './styles';
import withPageLoading from '../../helpers/withPageLoading';

const useCalendarSource = (options = {}) => {
  const {
    fromKey = 'date',
    toKey = 'date',
    getBackgroundEvents,
  } = options;

  // avoids fetching state
  const { poll: get, patch } = React.useContext(Dispatcher);

  const { search } = useLocation();
  const qp = useQueryParams();

  const makeQueryString = (info) =>
    `${qp.encode({
      ...qp.decode(search),
      [`${fromKey}<`]: castToUTC(info.startStr),
      [`${toKey}>`]: castToUTC(info.endStr),
    })}&limit=500`;

  return {
    getBackgroundEvents(info) {
      if (!isFunction(getBackgroundEvents)) return [];
      return getBackgroundEvents(
        makeQueryString(info, 'date', 'date'),
      );
    },
    getEvents(info) {
      return get(makeQueryString(info, 'date', 'date'));
    },

    update(id, args) {
      return patch(id)({
        [fromKey]: args,
      });
    },
  };
};

const Calendar = (props) => {
  const { handleEventContent, resolvers } = props;
  const cls = useStyle();
  const calenderSource = useCalendarSource(props);
  const navigate = useNavigate();

  const { data } = React.useContext(Store);

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();

    if (info.event.id) navigate(`/shows/${info.event.id}`);
  };

  const handleEventChange = ({
    event: { id, start },
    revert,
  }) => {
    calenderSource
      .update(id, moment(start).toISOString())
      .catch(() => {
        revert();
      });
  };

  const fetchData = (info) => {
    console.log('LOAD');
    return calenderSource.getEvents(info);
  };

  return (
    <Box className={cls.root}>
      <FullCalendar
        allDaySlot={false}
        lazyFetching
        events={map(data, (resource) => ({
          url: '/',
          ...pick(
            isFunction(resolvers)
              ? { ...resource, ...resolvers(resource) }
              : resource,
            [
              'id',
              'title',
              'start',
              'end',
              'backgroundColor',
              'textColor',
            ],
          ),
        }))}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
        }}
        headerToolbar={{
          // only show list on phone
          center: 'timeGridWeek,dayGridMonth,list',
        }}
        height="100%"
        initialView="timeGridWeek"
        plugins={[daygrid, timegrid, list, interaction]}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        eventContent={handleEventContent}
        datesSet={fetchData}
      />
    </Box>
  );
};

export default withPageLoading(Calendar);
