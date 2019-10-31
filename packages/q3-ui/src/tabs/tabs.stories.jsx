import React from 'react';
import { storiesOf } from '@storybook/react';
import sidebar from './README.md';
import Tabs from '.';

storiesOf('Components|Tabs', module)
  .addParameters({
    jest: ['tabs'],
    readme: {
      sidebar,
    },
  })
  .add(
    'With router',
    () => (
      <Tabs
        root="/"
        views={[
          {
            to: '/',
            label: 'Entry',
            component: () => <p>Default</p>,
          },
          {
            to: 'foo',
            label: 'Foo',
            component: () => <p>ONE</p>,
          },
          {
            to: 'bar',
            label: 'Bar',
            component: () => <p>TWO</p>,
          },
          {
            to: 'quux',
            label: 'Quux',
            component: () => <p>THREE</p>,
          },
          {
            to: 'garply',
            label: 'Garply',
            component: () => <p>FOUR</p>,
          },
          {
            to: 'baz',
            label: 'Baz',
            component: () => <p>Five</p>,
          },
          {
            to: 'uno',
            label: 'Uno',
            component: () => <p>Size</p>,
          },
          {
            to: 'baz',
            label: 'Baz',
            component: () => <p>Five</p>,
          },
          {
            to: 'baz',
            label: 'Baz',
            component: () => <p>Five</p>,
          },
          {
            to: 'uno',
            label: 'Uno',
            component: () => <p>Size</p>,
          },
          {
            to: 'baz',
            label: 'Baz',
            component: () => <p>Five</p>,
          },
        ]}
      />
    ),
    {
      router: '/',
    },
  );
