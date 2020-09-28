import React from 'react';
import { storiesOf } from '@storybook/react';
import DynamicAccordion from '.';

storiesOf('Components/Dynamic Accordion', module).add(
  'Default',
  () => (
    <DynamicAccordion
      panels={[
        {
          id: 1,
          title: 'One',
          description: 'Description',
          slug: '/testing',
          component: <div>One</div>,
          imgSrc:
            'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png',
        },
        {
          id: 2,
          title: 'Two',
          description: 'Description',
          slug: '/testing',
          component: <div>Two</div>,
          imgSrc:
            'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png',
        },
        {
          id: 3,
          title: 'Three',
          description: 'Description',
          slug: '/testing',
          component: <div>Three</div>,
          imgSrc:
            'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png',
        },
      ]}
    />
  ),
);
