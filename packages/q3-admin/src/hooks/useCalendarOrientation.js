import React from 'react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import { useTranslation } from 'q3-ui-locale';
import { delay } from 'lodash';
import moment from '@fullcalendar/moment';
import momentTimezone from '@fullcalendar/moment-timezone';
import { ArticleAsideContext } from '../components/ArticleAside/ArticleAside';
import useBrowserEffect from './useBrowserEffect';

const useCalendarOrientation = () => {
  const { t } = useTranslation('labels');
  const [initialView, setInitialView] = React.useState();
  const ref = React.useRef();
  const { id } = React.useContext(ArticleAsideContext);

  useBrowserEffect(
    () => {
      const v = 'timeGridWeek';
      if (initialView && ref.current)
        ref.current.getApi().changeView(v);
      else setInitialView(v);
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
