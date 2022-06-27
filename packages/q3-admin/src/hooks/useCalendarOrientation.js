import React from 'react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
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
    if (browser.isBrowserReady()) {
      const v = 'timeGridWeek';

      if (initialView && ref.current)
        ref.current.getApi().changeView(v);
      else setInitialView(v);
    }
  }, [initialView]);

  return {
    headerToolbar: {
      center: 'timeGridWeek,dayGridMonth',
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
