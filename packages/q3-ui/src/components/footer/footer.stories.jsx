import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from '.';

storiesOf('Components|Footer', module).add(
  'With social links',
  () => (
    <Footer
      socialLinks={[
        'https://facebook.com',
        'https://twitter.com',
        'https://linkedin.com',
        'https://github.com',
      ]}
    />
  ),
);
