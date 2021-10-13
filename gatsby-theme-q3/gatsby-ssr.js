/* eslint-disable import/prefer-default-export, react/prop-types, react/jsx-filename-extension */
import React from 'react';
import { PageWrapper, Wrapper } from './src/components';

export const wrapPageElement = ({ element }, plugin) => (
  <PageWrapper {...plugin}>{element}</PageWrapper>
);

export const wrapRootElement = ({ element }, plugin) => (
  <Wrapper {...plugin}>{element}</Wrapper>
);
