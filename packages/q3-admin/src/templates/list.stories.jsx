import Axios from 'axios';
import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './list';

Axios.defaults.baseURL = '`https://rickandmortyapi.com/api';

storiesOf('Templates|List', module).add(
  'Progress loading',
  () => (
    <List
      resourceName="characters"
      name="charter"
      columns={['name']}
    />
  ),
);
