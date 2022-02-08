import React from 'react';
import axios from 'axios';
import { browser } from 'q3-ui-helpers';
import { AuthContext } from 'q3-ui-permissions';

const useProfileLocale = () => {
  const lang =
    React.useContext(AuthContext)?.state?.profile?.lang ||
    'en';

  React.useEffect(() => {
    axios.defaults.headers['Content-Language'] = lang;
    browser.proxyLocalStorageApi(
      'setItem',
      'q3-locale',
      lang,
    );
  }, [lang]);
};

export default useProfileLocale;
