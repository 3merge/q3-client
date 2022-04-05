import React from 'react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import list from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import moment from '@fullcalendar/moment';
import momentTimezone from '@fullcalendar/moment-timezone';

const useCalendarOrientation = () => {
  const { t } = useTranslation('labels');
  const [initialView, setInitialView] = React.useState();
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    function reportWindowSize() {
      const v =
        window.innerWidth < 960 ? 'list' : 'timeGridWeek';

      if (initialView && ref.current)
        ref.current.getApi().changeView(v);
      else setInitialView(v);
    }

    window.addEventListener('resize', reportWindowSize);
    reportWindowSize.call(window);

    return () => {
      window.removeEventListener(
        'resize',
        reportWindowSize,
      );
    };
  }, [initialView]);

  return {
    headerToolbar: {
      center: 'timeGridWeek,dayGridMonth,list',
    },
    buttonText: {
      today: t('today'),
      month: t('month'),
      week: t('week'),
      day: t('day'),
      list: t('list'),
    },
    initialView,
    plugins: [
      moment,
      momentTimezone,
      daygrid,
      timegrid,
      list,
      interaction,
    ],
    ref,
  };
};
export default useCalendarOrientation;
