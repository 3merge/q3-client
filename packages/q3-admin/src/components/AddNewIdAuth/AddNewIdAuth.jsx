import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { Definitions } from '../../containers/state';

export const AddNewIdAuth = ({ children }) => {
  const { collectionName } = React.useContext(Definitions);
  const { HideByField } = useAuth(collectionName);

  return children ? (
    <HideByField path="id" op="Create">
      {children}
    </HideByField>
  ) : null;
};

AddNewIdAuth.defaultProps = {
  children: null,
};

AddNewIdAuth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default AddNewIdAuth;
