import React from 'react';
import Authorship from '.';

export default {
  title: 'Q3 UI|Components/Authorship',
  parameters: {
    component: Authorship,
    componentSubtitle: 'Citation line with datestamp',
  },
};

export const WithAuthor = () => (
  <Authorship author="Mike" />
);

export const WithoutProps = () => <Authorship />;
