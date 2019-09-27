import React from 'react';
import { storiesOf } from '@storybook/react';
import Toolbar from '.';
import Header from '../header';

storiesOf('Components|Toolbar', module).add(
  'Default render',
  () => (
    <Header name="Hooli">
      <Toolbar
        name="Gavin"
        profileImgSrc="https://picsum.photos/id/863/200/300"
        items={[
          {
            onClick: () => null,
            label: 'Logout',
          },
          {
            onClick: () => null,
            label: 'Support',
          },
        ]}
      />
    </Header>
  ),
);
