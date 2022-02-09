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
    const prev = browser.proxyLocalStorageApi(
      'getItem',
      'q3-locale',
    );

    browser.proxyLocalStorageApi(
      'setItem',
      'q3-locale',
      lang,
    );

    // change in locale now requires full page reload...
    if (lang !== prev && browser.isBrowserReady())
      window.location.reload();
  }, [lang]);
};

export default useProfileLocale;
