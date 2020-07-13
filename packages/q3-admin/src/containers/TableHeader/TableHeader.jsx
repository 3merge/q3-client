import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { useTitle } from '../../hooks';
import { Definitions, Store } from '../state';

const TableHeader = ({ children, ...rest }) => {
  const defs = React.useContext(Definitions);
  const { data } = React.useContext(Store);

  return (
    <Header {...rest} {...useTitle(data, defs)}>
      {children}
    </Header>
  );
};

TableHeader.defaultProps = {
  children: null,
};

TableHeader.propTypes = {
  children: PropTypes.node,
};

export default TableHeader;
