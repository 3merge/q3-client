import React from 'react';
/** @TODO move into default tempalte */

import Main from '../../components/main';
import Layout from '.';

export default {
  title: 'Templates/WithFilter',
  parameters: {
    component: Layout,
    componentSubtitle:
      "Template for decorating Q3 admin's default <Main /> component",
  },
};

export const Default = () => (
  <Main
    renderAside={() => 'Nav.'}
    render={() => (
      <Layout
        renderAside={() => 'Filter.'}
        renderMain={() => (
          <div style={{ height: '300vh' }}>Main</div>
        )}
      />
    )}
  />
);

export const WithOverflow = () => (
  <Main
    renderAside={() => 'Nav.'}
    render={() => (
      <Layout
        renderAside={() => (
          <div style={{ height: '200vh' }}>Filter</div>
        )}
        renderMain={() => (
          <div style={{ height: '300vh' }}>Main</div>
        )}
      />
    )}
  />
);
