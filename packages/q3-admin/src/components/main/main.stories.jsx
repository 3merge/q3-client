import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import AccountBox from '@material-ui/icons/AccountBox';
import AirportShuttle from '@material-ui/icons/AirportShuttle';
import Apple from '@material-ui/icons/Apple';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Main from '.';

export default {
  title: 'Q3 Admin|Components/Main',
  parameters: {
    component: Main,
    componentSubtitle: "Q3's standard application layout",
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
    icon: AirportShuttle,
  },
  {
    to: '/quuz',
    index: true,
    collectionName: 'foo',
    resourceName: 'quuz',
    renderFilter: () => <p>My filter panel 2</p>,
    icon: Apple,
  },
];

export const Default = () => (
  <Location>
    <AuthContext.Provider
      value={{
        state: {
          init: true,
          profile: {
            firstName: 'Mike',
          },
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
        ProfileBarProps={{
          name: 'Mike',
          imgSrc:
            'https://randomuser.me/api/portraits/men/44.jpg',
          menuItems: [
            {
              label: 'Foo',
              onClick: () => null,
            },
          ],
        }}
        pages={makeMenuItems()}
        render={() => (
          <Container maxWidth="xl">
            <Typography variant="h2">
              This is the main area
            </Typography>
            <Typography variant="body2">
              Do with it what you will...
            </Typography>
          </Container>
        )}
      />
    </AuthContext.Provider>
    <LocationDebugger />
  </Location>
);
