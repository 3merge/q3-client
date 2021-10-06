// eslint-disable-next-line
import React from 'react';
import { navigate } from 'gatsby';
import useAppDirectory from './useAppDirectory';

const IndexPage = () => {
  navigate(useAppDirectory());
  return null;
};

export default IndexPage;
