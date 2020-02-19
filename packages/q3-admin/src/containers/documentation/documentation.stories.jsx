import React from 'react';
import Documentation from '.';
import fixture from './__fixtures__/markdown.md';

export default {
  title: 'Q3 Admin|Containers/Documentation',
  parameters: {
    component: Documentation,
    componentSubtitle:
      'Markdown importer for in-app content display',
  },
};

export const WithData = () => (
  <Documentation
    filepath={Promise.resolve({
      content: { data: fixture },
    })}
  />
);

export const AsError = () => (
  <Documentation filepath={Promise.reject(new Error())} />
);
