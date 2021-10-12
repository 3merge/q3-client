import React from 'react';
import i18n from 'i18next';
import { AuthContext } from 'q3-ui-permissions';
import { useTimezoneInterceptor } from 'q3-ui-rest';

const useLocale = () => {
  const profile = React.useContext(AuthContext)?.state
    ?.profile;

  useTimezoneInterceptor(profile?.timezone);

  React.useEffect(() => {
    const lng = profile?.lang;
    if (lng) i18n.changeLanguage(lng);
  }, []);
};

export default useLocale;