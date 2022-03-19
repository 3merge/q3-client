import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';
import axios from 'axios';
import users from './users';

const profile = users[0];

const genPermission = (rest) => ({
  ownership: 'Any',
  fields: '*',
  ...rest,
});

const setupProfilePermissions = (coll) => [
  genPermission({
    op: 'Read',
    coll,
    inClient: true,
  }),
  genPermission({
    op: 'Update',
    coll,
  }),
  genPermission({
    op: 'Create',
    coll,
  }),
  genPermission({
    op: 'Delete',
    coll,
  }),
];

const StoriesApiMockAuthentication = ({ children }) => {
  const [filters, setFilters] = React.useState({});
  const [session, setSession] = React.useState(profile);
  const characters = setupProfilePermissions('characters');
  const shows = setupProfilePermissions('shows');
  const emails = setupProfilePermissions('emails');
  const audit = setupProfilePermissions('audit');

  return (
    <AuthContext.Provider
      // eslint-disable-next-line
      value={{
        update: (data, done) => {
          if (!(data instanceof FormData)) {
            setFilters(data.filters);
          }

          return axios
            .post('/profile', data)
            .then((r) => {
              setSession(r.data.profile);
            })
            .then(() => {
              if (done) return done();
              return null;
            });
        },
        state: {
          init: true,
          profile: session,
          permissions: [
            ...characters,
            ...shows,
            ...emails,
            ...audit,
            {
              op: 'Read',
              coll: 'profile',
              fields: ['*'],
            },
            {
              op: 'Create',
              coll: 'profile',
              fields: ['*'],
            },
            {
              op: 'Read',
              coll: 'queues',
            },
            {
              op: 'Read',
              coll: 'domain',
              fields: ['*'],
            },
            {
              op: 'Create',
              coll: 'domain',
              fields: [
                '!resources.titles*',
                '!supportedLngs',
              ],
            },
          ],
          filters,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

StoriesApiMockAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoriesApiMockAuthentication;
