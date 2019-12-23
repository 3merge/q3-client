import React from 'react';
import { storiesOf } from '@storybook/react';
import Statistic from '.';

storiesOf('Components|Statistic', module)
  .add('Negative', () => (
    <Statistic
      difference={-12}
      text="Examples"
      num={1200}
    />
  ))
  .add('Positive', () => (
    <Statistic
      difference={112}
      text="Examples"
      num={1200}
    />
  ))
  .add('Neutral', () => (
    <Statistic difference={0} text="Examples" num={1200} />
  ));
