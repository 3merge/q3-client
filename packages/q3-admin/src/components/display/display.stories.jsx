import React from 'react';
import Display from '.';
import Public from '../public';

export default {
  title: 'Q3 Admin|Components/Display',
  parameters: {
    component: Display,
    componentSubtitle:
      'Handles loading/error state textually',
  },
};

export const WithLoading = () => <Display loading />;
export const WithError = () => (
  <Display error errorLabel="error" />
);

export const WithChildren = () => (
  <Display>Success</Display>
);

export const PublicView = () => (
  <Public
    companyName="3merge"
    logo="https://logoipsum.com/assets/logo/logo-4.svg"
  />
);
