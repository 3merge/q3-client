import React from 'react';
import { storiesOf } from '@storybook/react';
import Timeline, { TimelineSkeleton } from '.';
import data from './data';
import sidebar from './README.md';

storiesOf('Components|Timeline', module)
  .addParameters({
    jest: ['timeline'],
    readme: {
      sidebar,
    },
  })
  .add('Default render', () => <Timeline entries={data} />)
  .add('Skeleton', () => <TimelineSkeleton />);
