import React from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import { isFunction, map, pick } from 'lodash';
import { Box } from '@material-ui/core';
import { Store } from '../state';
import useStyle from './styles';
import useCalendarSource from '../../hooks/useCalendarSource';
import useCalendarOrientation from '../../hooks/useCalendarOrientation';
import withPageLoading from '../../helpers/withPageLoading';

export const formatCalendarEvents = (xs, fn) => {
  const formatter = isFunction(fn) ? fn : (a) => a;
  return map(xs, (event) => ({
    url: '/',
    ...pick(
      {
        ...event,
        ...formatter(event),
      },
      [
        'id',
        'title',
        'start',
        'end',
        'backgroundColor',
        'borderColor',
        'textColor',
        'editable',
        'durationEditable',
      ],
    ),
  }));
};

const Calendar = (props) => {
  const { handleEventContent, resolvers } = props;
  const { data } = React.useContext(Store);
  const calendarSource = useCalendarSource(props);
  const cls = useStyle();
  const calendarOrientation = useCalendarOrientation();

  const events = React.useMemo(
    () => formatCalendarEvents(data, resolvers),
    [data],
  );

  return (
    <Box className={cls.root}>
      {calendarOrientation.initialView && (
        <FullCalendar
          {...props}
          allDaySlot={false}
          lazyFetching
          events={[
            ...map(
              calendarSource.backgroundEvents,
              (bg) => ({
                ...bg,
                id: `bg-${bg.id}`,
                display: 'background',
              }),
            ),
            ...events,
          ]}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}
          height="100%"
          eventClick={calendarSource.navigate}
          eventChange={calendarSource.update}
          eventContent={handleEventContent}
          datesSet={calendarSource.getEvents}
          {...calendarOrientation}
        />
      )}
    </Box>
  );
};

Calendar.defaultProps = {
  handleEventContent: undefined,
  resolvers: undefined,
};

Calendar.propTypes = {
  handleEventContent: PropTypes.func,
  resolvers: PropTypes.func,
};

export default withPageLoading(Calendar);
