// eslint-disable-next-line
import React from 'react';
import { navigate } from 'gatsby';
import { browser } from 'q3-ui-helpers';
import useSiteMetaData from './useSiteMetaData';

const IndexPage = () => {
  React.useEffect(() => {
    if (browser.isBrowserReady())
      navigate(useSiteMetaData().appDirectory);
  }, []);

  return null;
};

export default IndexPage;
