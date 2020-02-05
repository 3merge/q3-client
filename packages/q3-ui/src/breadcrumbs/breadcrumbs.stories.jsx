import React from 'react';
import {
  Router,
  Link,
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';
import Breadcrumbs from '.';

export default {
  title: 'Components/Breadcrumbs',
  parameters: {
    component: Breadcrumbs,
    componentSubtitle: 'Integrated',
  },
};

const Bar = () => 'Bar';
const Foo = ({ children }) => children;
const Foo1 = () => 'Foo Nested 1';
const Foo2 = () => 'Foo Nested 2';
const Foo2a = () => 'Foo Nested 2 A';
const Foo2b = () => 'Foo Nested 2 B';

const PageNavigation = ({ children }) => {
  const source = createMemorySource('/');
  const history = createHistory(source);

  return (
    <LocationProvider history={history}>
      {children}
    </LocationProvider>
  );
};

const Nav = ({ mode }) => {
  return (
    <>
      <Breadcrumbs mode={mode} />

      <p>Select a link</p>
      <ul>
        <li>
          <Link to="/en-ca/foo">Link 1</Link>
          <ul>
            <li>
              <Link to="/en-ca/foo/1">Link 1 - Child</Link>
            </li>
            <li>
              <Link to="/en-ca/foo/2">
                Link 1 - Child 2
              </Link>
              <ul>
                <li>
                  <Link to="/en-ca/foo/2/a">
                    Link 1 - SubChild 1
                  </Link>
                </li>
                <li>
                  <Link to="/en-ca/foo/2/b">
                    Link 1 - SubChild 2
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/en-ca/path-that-is-way-to-long">
            Link 2
          </Link>
        </li>
      </ul>
    </>
  );
};

export const Example = () => {
  return (
    <PageNavigation>
      <Nav path="/" mode="light" />

      <Router>
        <Foo path="/en-ca/foo">
          <Foo1 path="/en-ca/foo/1" />
          <Foo2 path="/en-ca/foo/2">
            <Foo2a path="/en-ca/foo/2/a" />
            <Foo2b path="/en-ca/foo/2/b" />
          </Foo2>
        </Foo>
        <Bar path="/en-ca/path-that-is-way-to-long" />
      </Router>
    </PageNavigation>
  );
};

export const ExampleDark = () => {
  return (
    <PageNavigation>
      <div style={{ background: 'black' }}>
        <Nav path="/" mode="dark" />

        <Router>
          <Foo path="/en-ca/foo">
            <Foo1 path="/en-ca/foo/1" />
            <Foo2 path="/en-ca/foo/2">
              <Foo2a path="/en-ca/foo/2/a" />
              <Foo2b path="/en-ca/foo/2/b" />
            </Foo2>
          </Foo>
          <Bar path="/en-ca/path-that-is-way-to-long" />
        </Router>
      </div>
    </PageNavigation>
  );
};
