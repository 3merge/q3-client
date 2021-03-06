import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';
import axios from 'axios';
import users from './users';

const profile = {
  ...users[0],
  role: 'Developer',
};

const genPermission = (rest) => ({
  ownership: 'Any',
  fields: '*',
  ...rest,
});

const setupProfilePermissions = (coll) => [
  genPermission({ op: 'Read', coll, inClient: true }),
  genPermission({ op: 'Update', coll }),
  genPermission({ op: 'Create', coll }),
  genPermission({ op: 'Delete', coll }),
];

const StoriesApiMockAuthentication = ({ children }) => {
  const [filters, setFilters] = React.useState({});
  const [session, setSession] = React.useState(profile);
  const characters = setupProfilePermissions('characters');
  const shows = setupProfilePermissions('shows');

  return (
    <AuthContext.Provider
      value={{
        update: (data) => {
          setFilters(data.filters);
          return axios.post('/profile', data).then((r) => {
            setSession(r.data.profile);
          });
        },
        state: {
          init: true,
          profile: session,
          permissions: [...characters, ...shows],
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
