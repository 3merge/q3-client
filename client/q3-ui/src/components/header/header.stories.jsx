import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '.';

storiesOf('Header', module)
  .add('Default', () => (
    <Header
      logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png"
      customLogoHeight={95}
      menuItems={[
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
      ]}
      menuPosition="left"
    />
  ))
  .add('Background', () => (
    <Header
      search
      logoImgSrc={logo}
      customLogoHeight={95}
      menuPosition="right"
      styleOnRoute={{
        '/': {
          backgroundColor: 'red',
        },
      }}
    />
  ));
