import React from 'react';
import { storiesOf } from '@storybook/react';
import Alert from '.';

storiesOf('Components|Alert', module)
  .add('Default', () => <Alert label="cookies" link="/" />)
  .add('Error', () => <Alert label="whoops" type="error" />)
  .add('Success', () => (
    <Alert label="yay!" type="success" />
  ));
