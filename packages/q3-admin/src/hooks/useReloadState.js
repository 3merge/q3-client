import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'react-i18next';

export default () => {
  // stores the interval
  let timer;
  const { t } = useTranslation('descriptions');

  return () => {
    if (!browser.isBrowserReady()) return;

    timer = setTimeout(() => {
      window.location.reload();
    }, 5000);

    // eslint-disable-next-line
    if (confirm(t('newVersionAvailable'))) {
      clearTimeout(timer);
      timer = null;
    }
  };
};
