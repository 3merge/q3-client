import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { Definitions } from '../state';

const AuthDelete = ({ children }) => {
  const { collectionName } = React.useContext(Definitions);
  const { Hide } = useAuth(collectionName);
  return <Hide op="Delete">{children}</Hide>;
};

AuthDelete.defaultProps = { children: null };
AuthDelete.propTypes = { children: PropTypes.node };

export default AuthDelete;
