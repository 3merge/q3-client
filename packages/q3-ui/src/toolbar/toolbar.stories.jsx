import React from 'react';
import { storiesOf } from '@storybook/react';
import Toolbar from '.';
import Header from '../header';
import Translate from '../translate';

storiesOf('Components/Toolbar', module)
  .add('Not logged in', () => (
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
      >
        <Translate items={[]} />
      </Toolbar>
    </Header>
  ))
  .add('Logged in', () => (
    <Header name="Hooli">
      <Toolbar
        isLoggedIn
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
  ));
