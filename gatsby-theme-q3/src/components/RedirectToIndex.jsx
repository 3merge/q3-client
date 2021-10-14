import React from 'react';
import Redirect from './Redirect';
import useSiteMetaData from './useSiteMetaData';

const IndexPage = () => (
  <Redirect to={useSiteMetaData().appDirectory} />
);

export default IndexPage;
