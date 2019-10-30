import React from 'react';
import { storiesOf } from '@storybook/react';
import Picture from '.';

storiesOf('Components|Picture', module).add(
  'Default',
  () => (
    <Picture
      service={() =>
        new Promise((resolve) => {
          console.log('started');
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      }
    />
  ),
);
