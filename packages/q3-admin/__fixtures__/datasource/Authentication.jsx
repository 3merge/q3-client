import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const profile = {
  id: 1,
  photo: 'https://randomuser.me/api/portraits/men/22.jpg',
  firstName: 'Mike',
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
  const characters = setupProfilePermissions('characters');
  const shows = setupProfilePermissions('shows');

  return (
    <AuthContext.Provider
      value={{
        update: (data) => {
          setFilters(data.filters);
        },
        state: {
          init: true,
          profile,
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
