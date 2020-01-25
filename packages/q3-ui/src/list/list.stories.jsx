import React from 'react';
import List from '.';

export default {
  title: 'Components/List',
  parameters: {
    component: List,
    componentSubtitle:
      'Stylized unordered list component with optional interactivity',
  },
};

export const ListComplete = () => (
  <List title="Completely populated list" />
);

export const Empty = () => (
  <List title="Waiting for action!" />
);

export const WithTitle = () => (
  <List title="For demonstration" />
);

export const WithoutActions = () => <p>Hi</p>;
export const WithActions = () => <p>Hi</p>;
export const WithSearch = () => <p>Hi</p>;
