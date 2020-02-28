import React from 'react';
import Section from '.';

export default {
  title: 'Q3 Admin|Components/Section',
  parameters: {
    component: Section,
    componentSubtitle:
      'Column-based section component with optional aside rendering',
  },
};

export const WithOutSidebar = () => (
  <Section>
    <div style={{ background: '#FFF', width: '100%' }}>
      Full-width section content
    </div>
  </Section>
);

export const WithSidebar = () => (
  <Section renderSidebar={() => 'Sidebar!'}>
    Section content
  </Section>
);

export const WithFetching = () => <Section fetching />;
