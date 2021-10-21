import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';
import LocationProvider from 'q3-ui-test-utils/lib/location';

const COLLECTON_NAME = 'testing-repeater';

const AuthContextProvider = ({
  children,
  read,
  create,
  update,
  remove,
}) => (
  <LocationProvider>
    <AuthContext.Provider
      value={{
        state: {
          init: true,
          profile: {
            role: 'Developer',
          },
          permissions: [
            {
              role: 'Developer',
              coll: COLLECTON_NAME,
              fields: read,
              op: 'Read',
            },
            {
              role: 'Developer',
              coll: COLLECTON_NAME,
              fields: update,
              op: 'Update',
            },
            {
              role: 'Developer',
              coll: COLLECTON_NAME,
              fields: remove,
              op: 'Delete',
            },
            {
              role: 'Developer',
              coll: COLLECTON_NAME,
              fields: create,
              op: 'Create',
            },
          ],
        },
      }}
    >
      {React.cloneElement(children, {
        collectionName: COLLECTON_NAME,
        name: 'test',
      })}
    </AuthContext.Provider>
  </LocationProvider>
);

AuthContextProvider.defaultProps = {
  children: 'div',
  read: '*',
  create: '*',
  update: '*',
  remove: '*',
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]),
  read: PropTypes.string,
  create: PropTypes.string,
  update: PropTypes.string,
  remove: PropTypes.string,
};

export default AuthContextProvider;
