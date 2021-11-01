/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Link } from '@reach/router';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { Definitions } from '../state';

const TableLink = ({ id }) => {
  const { rootPath } = React.useContext(Definitions);

  return (
    <IconButton
      color="inherit"
      component={Link}
      to={`${rootPath}/${id}`}
    >
      <OpenInBrowserIcon />
    </IconButton>
  );
};

TableLink.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default TableLink;
