import React from 'react';
import { navigate } from 'gatsby';
import useSiteMetaData from './useSiteMetaData';

const IndexPage = () => {
  const d = useSiteMetaData().appDirectory;

  React.useEffect(() => {
    navigate(d);
  }, []);

  return null;
};

export default IndexPage;
