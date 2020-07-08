import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TableSettings from '../TableSettings';
import UnsavedChanges from '../UnsavedChanges';
import Header from '../../components/Header';
import { useTitle } from '../../hooks';
import { Definitions, Store } from '../state';

const TableHeader = ({ children, ...rest }) => {
  const defs = React.useContext(Definitions);
  const { data } = React.useContext(Store);

  return (
    <Header {...rest} {...useTitle(data, defs)}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>{children}</Grid>
        <Grid item>
          <TableSettings />
        </Grid>
        <Grid item>
          <UnsavedChanges />
        </Grid>
      </Grid>
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
