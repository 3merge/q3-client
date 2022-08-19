import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import MenuSystemContext from '../MenuSystemContext';

const DirectoryLink = ({ children, ...rest }) => {
  const { directory = '/' } = React.useContext(
    MenuSystemContext,
  );

  return (
    <Link to={directory} {...rest}>
      {children}
    </Link>
  );
};

DirectoryLink.defaultProps = {
  children: null,
};

DirectoryLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default DirectoryLink;
