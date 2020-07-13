import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

export const COLLECTION_NAME = 'api-investors';

const genPermission = (rest) => ({
  coll: COLLECTION_NAME,
  ownership: 'Any',
  fields: '*',
  ...rest,
});

const permissions = [
  genPermission({ op: 'Read', fields: ['!gender'] }),
  genPermission({ op: 'Update' }),
  genPermission({ op: 'Create' }),
  genPermission({ op: 'Delete' }),
];

const profile = {
  id: 1,
  photo: 'https://randomuser.me/api/portraits/men/22.jpg',
  firstName: 'Mike',
};

const StoriesApiMockAuthentication = ({ children }) => {
  const [filters, setFilters] = React.useState({
    'api-investors': {
      Female: 'gender=Female',
      Male: 'gender=Male',
    },
  });

  return (
    <AuthContext.Provider
      value={{
        update: (data, done) => {
          setFilters(data.filters);
          if (done) alert('Called done!');
        },
        state: {
          init: true,
          profile,
          permissions,
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
