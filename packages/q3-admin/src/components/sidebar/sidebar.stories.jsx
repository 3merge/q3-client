import React from 'react';
import Sidebar from '.';

export default {
  title: 'Q3 Admin|Components/Sidebar',
  parameters: {
    component: Sidebar,
    componentSubtitle: 'Pre-built aside for detail views',
  },
};

export const WithoutTabs = () => <Sidebar />;

export const WithComments = () => (
  <Sidebar
    commentTab={() => <div />}
    historyTab={() => <div />}
  />
);
