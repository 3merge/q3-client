import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useLocation } from '@reach/router';
import { compact, size } from 'lodash';
import { compose } from 'lodash/fp';
import Back from '../../containers/back';

const checkNumber = compose(
  (v) => !Number.isNaN(v),
  Number,
);

const DirectoryLink = ({ children }) => {
  const explodedPath = compact(
    String(useLocation().pathname).split('/'),
  );

  const defaultPath = explodedPath
    .slice(0, explodedPath.findIndex(checkNumber))
    .join('/');

  return size(explodedPath) > 1 ? (
    <Back defaultPath={defaultPath} />
  ) : (
    children
  );
};

DirectoryLink.defaultProps = {
  children: null,
};

DirectoryLink.propTypes = {
  children: null,
};

export default DirectoryLink;
