import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';
import { map } from 'lodash';
import { collectionName } from './meta';

const AuthMock = ({ ops, children }) => (
  <AuthContext.Provider
    value={React.useMemo(
      () => ({
        state: {
          permissions: map(ops, (op) => ({
            coll: collectionName,
            fields: ['{featuredUpload,uploads*}'],
            op,
          })),
        },
      }),
      [ops],
    )}
  >
    {children}
  </AuthContext.Provider>
);

AuthMock.defaultProps = {
  children: null,
  ops: [],
};

AuthMock.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  ops: PropTypes.arrayOf(PropTypes.string),
};

export default AuthMock;
