import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MockRest from 'q3-ui-test-utils/lib/rest';
import Provider, { AuthContext } from '.';

export default {
  title: 'Q3 Permissions/Provider',
  parameters: {
    component: Provider,
    componentSubtitle:
      'Authentication provider that auto-calls REST points to determine profile and access control',
  },
};

const defs = (r) => {
  r.onGet('/profile').reply(200, {
    permissions: [],
    profile: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
  });
};

const SessionLoading = () => {
  const ctx = React.useContext(AuthContext);
  return !ctx.state.init ? 'Loading...' : null;
};

const RefreshProfile = () => {
  const ctx = React.useContext(AuthContext);
  return (
    <button type="button" onClick={ctx.refresh}>
      Refetch
    </button>
  );
};

export const WithProfile = () => (
  <MockRest define={defs} delay={1500}>
    <Typography>
      The Provider establishes context with three keys:
    </Typography>
    <Typography component="ol">
      <Typography component="li">
        The state itself, with nested profile and permission
        attributes;
      </Typography>
      <Typography component="li">
        The raw dispatcher fn from the internal useReducer
        implementation;
      </Typography>
      <Typography component="li">
        A refresh function for refetching the profile on
        change.
      </Typography>
    </Typography>
    <Divider />
    <Box py={2}>
      <Provider
        renderPrivate={(r) => (
          <div>
            Successfully fetched profile:{' '}
            {JSON.stringify(r)}
            <br />
            <RefreshProfile />
          </div>
        )}
      >
        <SessionLoading />
      </Provider>
    </Box>
  </MockRest>
);
