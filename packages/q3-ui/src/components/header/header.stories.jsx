import React from 'react';
import { Router } from '@reach/router';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import Header from '.';

const defaultProps = {
  logoImgSrc:
    'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png',
  customLogoHeight: 'auto',
  menuItems: [
    {
      href: 'foo',
      label: 'Foo',
      visible: true,
    },
    {
      href: 'bar',
      label: 'Bar',
      visible: true,
    },
    {
      href: 'qux',
      label: 'Qux',
      visible: true,
    },
  ],
};

const Foo = () => 'Foo';
const Bar = () => 'Bar';
const Qux = () => 'Qux';

const PageDemo = ({ children }) => (
  <>
    {children}
    <Router>
      <Foo path="foo" />
      <Bar path="bar" />
      <Qux path="qux" />
    </Router>
  </>
);

storiesOf('Components|Header', module)
  .add('Default', () => (
    <PageDemo>
      <Header {...defaultProps} />
    </PageDemo>
  ))
  .add('With search', () => (
    <PageDemo>
      <Header
        search
        searchVisible
        menuPosition="left"
        {...defaultProps}
      />
    </PageDemo>
  ))
  .add('With telephone', () => (
    <PageDemo>
      <Header
        search
        tel="416-999-2131"
        menuPosition="left"
        {...defaultProps}
      />
    </PageDemo>
  ))
  .add('With custom renders', () => (
    <PageDemo>
      <Header
        renderLeft={() => 'with love'}
        renderRight={() => (
          <Button
            variant="outlined"
            color="primary"
            size="large"
          >
            Baz!
          </Button>
        )}
        {...defaultProps}
      />
    </PageDemo>
  ));
