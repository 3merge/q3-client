import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import Menu from '.';
import Main from '../main';

export default {
  title: 'Q3 Admin/Components/Menu',
  parameters: {
    component: Menu,
    componentSubtitle: "Q3's auto menu generator",
  },
};

export const Default = () => (
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
      <Menu
        pages={[
          {
            to: '/foo',
            index: true,
            collectionName: 'foo',
            resourceName: 'foo',
            renderFilter: () => <p>My filter panel</p>,
          },
          {
            to: '/foo1',
            index: true,
            collectionName: 'foo',
            resourceName: 'foo1',
            renderFilter: () => <p>My filter panel 1</p>,
          },
          {
            to: '/foo2',
            index: true,
            collectionName: 'foo',
            resourceName: 'foo2',
            renderFilter: () => <p>My filter panel 2</p>,
          },
        ]}
      />
    </AuthContext.Provider>
    <LocationDebugger />
  </Location>
);

export const InMainAside = () => (
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
      <Main
        renderAside={() => (
          <Menu
            pages={[
              {
                to: '/foo',
                index: true,
                collectionName: 'foo',
                resourceName: 'foo',
                renderFilter: () => <p>My filter panel</p>,
              },
              {
                to: '/foo1',
                index: true,
                collectionName: 'foo',
                resourceName: 'foo1',
                renderFilter: () => (
                  <p>My filter panel 1</p>
                ),
              },
              {
                to: '/foo2',
                index: true,
                collectionName: 'foo',
                resourceName: 'foo2',
                renderFilter: () => (
                  <p>My filter panel 2</p>
                ),
              },
            ]}
          />
        )}
        render={() => null}
      />
    </AuthContext.Provider>
    <LocationDebugger />
  </Location>
);
