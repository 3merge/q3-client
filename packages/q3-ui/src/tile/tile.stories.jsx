import React from 'react';
import { storiesOf } from '@storybook/react';
import sidebar from './README.md';
import Title from '.';

storiesOf('Components|Tile', module)
  .addParameters({
    jest: ['tile'],
    readme: {
      sidebar,
    },
  })
  .add('Default render', () => (
    <div style={{ display: 'flex' }}>
      <Title
        title="Title!"
        subtitle="This is a description"
      />
    </div>
  ));
