import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import AccountBox from '@material-ui/icons/AccountBox';
import Menu from '.';
import Main from '../main';

export default {
  title: 'Q3 Admin/Components/Menu',
  parameters: {
    component: Menu,
    componentSubtitle:
      "Q3's auto menu generator and filter renderer",
  },
};

const makeMenuItems = () => [
  {
    to: '/foo',
    index: true,
    collectionName: 'foo',
    resourceName: 'foo',
    renderFilter: () => <p>My filter panel</p>,
    icon: AccountBox,
  },
  {
    to: '/bar',
    index: true,
    collectionName: 'foo',
    resourceName: 'bar',
    renderFilter: () => <p>My filter panel 1</p>,
    icon: AccountBox,
  },
  {
    to: '/quuz',
    index: true,
    collectionName: 'foo',
    resourceName: 'quuz',
    renderFilter: () => <p>My filter panel 2</p>,
    icon: AccountBox,
  },
];

const withWrapper = (Comp) => () => (
  <Location>
    <AuthContext.Provider
      value={{
        state: {
          permissions: [
            {
              coll: 'foo',
              op: 'Read',
              ownership: 'Any',
              fields: '*',
            },
          ],
        },
      }}
    >
      <Comp />
    </AuthContext.Provider>
    <LocationDebugger />
  </Location>
);

export const Default = withWrapper(() => (
  <Menu pages={makeMenuItems()} />
));

export const InMainAside = withWrapper(() => (
  <Main
    renderAside={() => <Menu pages={makeMenuItems()} />}
    render={() => null}
  />
));
