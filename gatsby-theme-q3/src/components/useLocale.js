import React from 'react';
import { i18n } from 'react-i18next';
import { AuthContext } from 'q3-ui-permissions';
import { useTimezoneInterceptor } from 'q3-ui-rest';

const useLocale = () => {
  const profile =
    React.useContext(AuthContext)?.state?.profile;

  const lng = profile?.lang;

  // use TRANSLATION is the way to go there.
  useTimezoneInterceptor(profile?.timezone);

  React.useEffect(() => {
    // language?
    if (lng && i18n.resolvedLanguage)
      i18n.changeLanguage(lng);
  }, [lng]);
};

export default useLocale;

/** 
MOVE THIS INTO ADMIN? */
