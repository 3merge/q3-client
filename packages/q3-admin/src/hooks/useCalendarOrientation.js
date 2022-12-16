import React from 'react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import { useTranslation } from 'q3-ui-locale';
import { delay, get } from 'lodash';
import moment from '@fullcalendar/moment';
import momentTimezone from '@fullcalendar/moment-timezone';
import { ArticleAsideContext } from '../components/ArticleAside/ArticleAside';
import useBrowserEffect from './useBrowserEffect';

const CALENDAR_CONSTANTS = {
  DAY: 'timeGridDay',
  MONTH: 'dayGridMonth',
  WEEK: 'timeGridWeek',
};

const useCalendarOrientation = (options) => {
  const { t } = useTranslation('labels');
  const [initialView] = React.useState(
    get(
      CALENDAR_CONSTANTS,
      String(
        get(options, 'defaultGridView', 'week'),
      ).toUpperCase(),
      CALENDAR_CONSTANTS.WEEK,
    ),
  );

  const ref = React.useRef();
  const { id } = React.useContext(ArticleAsideContext);

  const makeCenterValue = React.useCallback(() => {
    const values = [];

    if (get(options, 'enableDay', true))
      values.push(CALENDAR_CONSTANTS.DAY);

    if (get(options, 'enableWeek', true))
      values.push(CALENDAR_CONSTANTS.WEEK);

    if (get(options, 'enableMonth', true))
      values.push(CALENDAR_CONSTANTS.MONTH);

    return values.length > 1 ? values.join(',') : '';
  }, [options]);

  useBrowserEffect(
    () => {
      if (initialView && ref.current)
        ref.current.getApi().changeView(initialView);
    },
    [initialView],
    {
      useLayout: true,
    },
  );

  React.useLayoutEffect(() => {
    delay(() => {
      if (ref.current) {
        ref.current.getApi().updateSize();
      }
    }, 500);
  }, [id]);

  return {
    headerToolbar: {
      center: makeCenterValue(),
    },
    buttonText: {
      today: t('today'),
      month: t('month'),
      week: t('week'),
      day: t('day'),
    },
    initialView,
    plugins: [
      moment,
      momentTimezone,
      daygrid,
      timegrid,
      interaction,
    ],
    ref,
  };
};
export default useCalendarOrientation;
