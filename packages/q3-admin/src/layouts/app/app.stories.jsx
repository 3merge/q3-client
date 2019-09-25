import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from '@reach/router';
import Assignment from '@material-ui/icons/Assignment';
import AppLayout from '.';
import List from '../list';
import { Menu } from '../../components';

storiesOf('Layouts|App', module).add('With logo', () => (
  <AppLayout
    AppBarProps={{
      title: 'My Application',
    }}
    ProfileBarProps={{
      name: 'Jon Doe',
      imgSrc: 'https://picsum.photos/200/300',
      supportDeskUrl: 'https://google.ca',
      menuItems: [
        {
          label: 'Profile',
          onClick: () => null,
        },
        {
          label: 'Logout',
          onClick: () => null,
        },
      ],
    }}
    renderAside={() => (
      <Menu
        title="Primary pages"
        items={[
          {
            href: '/',
            label: 'Link One',
            visible: true,
            Icon: Assignment,
          },
          {
            href: '/foo',
            label: 'Link TWo',
            visible: true,
            Icon: Assignment,
          },
        ]}
      />
    )}
    render={() => (
      <Router>
        <List path="/" />
        <List path="/foo" />
      </Router>
    )}
  />
));
