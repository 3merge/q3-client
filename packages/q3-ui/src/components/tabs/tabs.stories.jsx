import React from 'react';
import { Route } from 'react-router-dom';
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
  .add('With router', () => (
    <>
      <Route
        render={(props) => (
          <p>
            {`ROUTE: ${JSON.stringify(
              props.location.pathname,
            )}`}
          </p>
        )}
      />
      <Tabs
        root="/"
        views={[
          {
            to: '',
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
        ]}
      />
    </>
  ));
