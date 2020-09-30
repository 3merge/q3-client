/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Translate from '.';

storiesOf('Components/Translate', module).add(
  'Default',
  () => (
    <Translate
      items={[
        {
          label: 'English',
          onClick: () => alert('English!'),
        },
        {
          label: 'French',
          onClick: () => alert('French!'),
        },
      ]}
    />
  ),
);
