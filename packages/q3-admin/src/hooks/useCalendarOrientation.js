import React from 'react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import list from '@fullcalendar/list';
import interaction from '@fullcalendar/interaction';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';

const useCalendarOrientation = () => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('sm'),
  );

  React.useEffect(() => {
    try {
      if (ref.current && isMobile)
        ref.current.getApi().changeView('list');
    } catch (e) {
      // noop
    }
  }, [isMobile]);

  return {
    headerToolbar: !isMobile
      ? {
          center: 'timeGridWeek,dayGridMonth,list',
        }
      : {},
    buttonText: {
      today: t('today'),
      month: t('month'),
      week: t('week'),
      day: t('day'),
      list: t('list'),
    },
    initialView: 'timeGridWeek',
    plugins: [daygrid, timegrid, list, interaction],
    ref,
  };
};
export default useCalendarOrientation;
