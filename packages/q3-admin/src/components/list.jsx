/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { getCSV } from 'q3-ui-rest';
import ErrorComponent from 'q3-ui/lib/error';
import Table, { TableViewSkeleton } from 'q3-ui/lib/table';
import TableActionBar from 'q3-ui/lib/tableActionBar';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import { useAuth } from 'q3-ui-permissions';
import { makeStyles } from '@material-ui/core/styles';
import EmptyIcon from '../images/empty';
import ErrorIcon from '../images/error';
import Context from './state';
import { isArray } from './utils';

const useStyles = makeStyles((theme) => ({
  inset: {
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));

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
  const { inset } = useStyles();

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
    if (state.fetching) return <TableViewSkeleton />;
    if (state.fetchingError) return <ErrorView />;
    if (!rows.length) return <EmptyView />;

    return (
      <Table
        {...state}
        {...rest}
        rows={rows}
        rowHeader={isArray(children)
          .map((child) => child.props.include)
          .filter(Boolean)}
      />
    );
  };

  return (
    <Redirect op="Read" to="/">
      <TableActionBar actions={actions}>
        <Container maxWidth="xl">
          <Box my={2} className={inset}>
            {renderTable()}
          </Box>
        </Container>
      </TableActionBar>
    </Redirect>
  );
};

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default List;
