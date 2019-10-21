import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '.';

storiesOf('Components|Upload', module).add(
  'Default',
  () => (
    <Upload
      fn={() =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1500),
        )
      }
    />
  ),
);
