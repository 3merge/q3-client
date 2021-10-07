// eslint-disable-next-line
import React from 'react';
import { navigate } from 'gatsby';
import useSiteMetaData from './useSiteMetaData';

const IndexPage = () => {
  navigate(useSiteMetaData().appDirectory);
  return null;
};

export default IndexPage;
