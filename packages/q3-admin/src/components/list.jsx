/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { getCSV } from 'q3-ui-rest';
import ErrorComponent from 'q3-ui/lib/error';
import Table, { TableSkeleton } from 'q3-ui-datatables';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import { useAuth } from 'q3-ui-permissions';
import EmptyIcon from '../images/empty';
import ErrorIcon from '../images/error';
import Context from './state';

export const EmptyView = () => (
  <ErrorComponent title="empty" description="empty">
    <EmptyIcon />
  </ErrorComponent>
);

export const ErrorView = () => (
  <ErrorComponent title="error" description="error">
    <ErrorIcon />
  </ErrorComponent>
);

export const getCSVByName = (name) => (ids = []) =>
  getCSV(`/${name}?_id=${ids.join(',')}`);

const List = ({ children, ...rest }) => {
  const {
    resourceName,
    resourceNameSingular,
    collectionName,
    location,
    ...state
  } = React.useContext(Context);

  const { Redirect, canDelete } = useAuth(collectionName);
  const rows = get(state, resourceName, []);

  const deleteBulk =
    canDelete && state.removeBulk ? state.removeBulk : null;

  const actions = [
    {
      icon: FileCopy,
      onClick: getCSVByName(collectionName),
      label: 'Export',
    },
  ];

  if (deleteBulk)
    actions.push({
      icon: DeleteSweep,
      onClick: deleteBulk,
      label: 'Delete',
    });

  const renderTable = () => {
    if (state.fetching) return <TableSkeleton />;
    if (state.fetchingError) return <ErrorView />;
    if (!rows.length) return <EmptyView />;
    return (
      <Table {...state} {...rest}>
        {children(rows)}
      </Table>
    );
  };

  return (
    <Redirect op="Read" to="/">
      <Box my={2}>
        <Container maxWidth="xl">{renderTable()}</Container>
      </Box>
    </Redirect>
  );
};

List.propTypes = {
  children: PropTypes.func.isRequired,
};

export default List;
