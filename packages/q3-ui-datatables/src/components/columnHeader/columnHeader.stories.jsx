import React from 'react';
import Column from '.';

export default {
  title: 'ColumnHeader',
  parameters: {
    component: Column,
    componentSubtitle:
      'Table header cell with localStorage-synced sorting',
    router: '?sort=name',
  },
};

export const withLocalStorage = () => (
  <Column id="for-testing" title="name" />
);
