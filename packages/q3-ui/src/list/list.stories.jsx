import React from 'react';
import Listing from '.';

export default {
  title: 'Components/List',
  parameters: {
    component: Listing,
    componentSubtitle:
      'Stylized unordered list component with optional interactivity',
  },
};
export const ListComplete = () => <p>Hi</p>;
export const ListWithoutActions = () => <p>Hi</p>;
export const ListWithActions = () => <p>Hi</p>;
export const ListWithSearch = () => <p>Hi</p>;
