import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import RepeaterState from '../state';

const getAuthByMethodName = (op) => {
  switch (op) {
    case 'Create':
      return 'canCreateSub';
    case 'Update':
      return 'canEditSub';
    case 'Delete':
      return 'canDeleteSub';
    case 'Read':
    default:
      return 'canSeeSub';
  }
};

export const Auth = ({ children, op }) => {
  const { name, collectionName } = React.useContext(
    RepeaterState,
  );

  const can = invoke(
    useAuth(collectionName),
    getAuthByMethodName(op),
    name,
  );

  if (!children || (!can && collectionName)) return null;

  return React.cloneElement(children, {
    name,
    collectionName,
  });
};

Auth.propTypes = {
  children: PropTypes.node,
  op: PropTypes.string.isRequired,
};

Auth.defaultProps = {
  children: null,
};

export default Auth;
