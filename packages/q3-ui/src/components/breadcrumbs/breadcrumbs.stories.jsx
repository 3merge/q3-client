import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router, Link } from '@reach/router';
import docs from './README.md';
import Breadcrumbs from '.';

const Bar = () => 'Bar';
const Foo = ({ children }) => children;
const Foo1 = () => 'Foo Nested 1';
const Foo2 = () => 'Foo Nested 2';
const Foo2a = () => 'Foo Nested 2 A';
const Foo2b = () => 'Foo Nested 2 B';

const Nav = () => (
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
  </>
);

storiesOf('Components|Breadcrumbs', module)
  .addParameters({
    jest: ['breadcrumbs'],
    readme: {
      sidebar: docs,
    },
  })
  .add('With router', () => (
    <>
      <Nav path="/" />
      <Router>
        <Foo path="/foo">
          <Foo1 path="/foo/1" />
          <Foo2 path="/foo/2">
            <Foo2a path="/foo/2/a" />
            <Foo2b path="/foo/2/b" />
          </Foo2>
        </Foo>
        <Bar path="/bar" />
      </Router>
    </>
  ));
