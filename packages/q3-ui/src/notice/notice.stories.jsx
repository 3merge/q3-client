import React from 'react';
import Notice from './notice';

export default {
  title: 'Q3 UI/Components/Notice',
  parameters: {
    components: Notice,
    componentSubtitle:
      'Information bar with optional click-for-more links',
  },
};

export const WithLink = () => (
  <Notice
    content="This is an information bar with more to read"
    to="/"
  />
);

export const WithoutLink = () => (
  <Notice content="This is an information bar without more to read" />
);
