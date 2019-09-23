import React from 'react';
import { storiesOf } from '@storybook/react';
import { Switch, Route, Link } from 'react-router-dom';
import docs from './README.md';
import Breadcrumbs from '.';

storiesOf('Components|Breadcrumbs', module)
  .addParameters({
    jest: ['breadcrumbs'],
    readme: {
      sidebar: docs,
    },
  })
  .add('With router', () => (
    <>
      <Breadcrumbs />
      <p>Select a link</p>
      <ul>
        <li>
          <Link to="/foo">Link 1</Link>
          <ul>
            <li>
              <Link to="/foo/1">Link 1 - Child</Link>
            </li>
            <li>
              <Link to="/foo/2">Link 1 - Child 2</Link>
              <ul>
                <li>
                  <Link to="/foo/2/a">
                    Link 1 - SubChild 1
                  </Link>
                </li>
                <li>
                  <Link to="/foo/2/b">
                    Link 1 - SubChild 2
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/bar">Link 2</Link>
        </li>
      </ul>

      <Switch>
        <Route
          path="foo"
          component={() => (
            <Switch>
              <Route
                path="foo/1"
                component={() => 'Foo 1'}
              />
              <Route
                path="foo/2"
                component={() => 'Foo 2'}
              />
            </Switch>
          )}
        />
        <Route path="bar" exact component={() => 'Bar!'} />
      </Switch>
    </>
  ));
