import React from 'react';
import { Location } from '@reach/router';
import JSONPretty from 'react-json-pretty';
import { storiesOf } from '@storybook/react';
import Assignment from '@material-ui/icons/Assignment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Docs from './README.md';
import Menu from '.';

const LocationTracking = () => (
  <Location>{(l) => <JSONPretty data={l} />}</Location>
);

const MenuImplementationStory = () => (
  <>
    <Menu
      title="My menu"
      color="orange"
      items={[
        {
          label: 'Link One',
          icon: Assignment,
          visible: true,
          to: 'one',
          subMenu: [
            {
              to: 'one',
              label: 'Direct to root',
            },
            {
              to: 'two',
              label: 'Nested',
            },
          ],
        },
        {
          to: 'huu',
          visible: false,
        },
        {
          to: 'three',
          label: 'Link Three (Link Two Invisible)',
          icon: AccountCircle,
          visible: true,
        },
        {
          to: 'https://google.ca',
          label: 'Link Four (External)',
          icon: AccountCircle,
          visible: true,
        },
      ]}
    />
    <LocationTracking />
  </>
);

export default MenuImplementationStory;

storiesOf('Components/Menu', module)
  .addParameters({
    jest: ['menu'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Default', () => <MenuImplementationStory />, {
    router: 'one',
  });
