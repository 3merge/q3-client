import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import { useLanguage } from 'q3-ui-locale';
import { first } from 'lodash';

const useLocale = () => {
  const i18n = useLanguage();

  const profile =
    React.useContext(AuthContext)?.state?.profile;

  const lng = profile?.lang;

  useTimezoneInterceptor(profile?.timezone);

  React.useEffect(() => {
    const root = first(String(lng).split('-'));
    if (root && root !== i18n.language)
      i18n.changeLanguage(root);
  }, [i18n, lng]);
};

export default useLocale;
