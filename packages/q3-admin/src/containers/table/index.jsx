/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Table, { TableSkeleton } from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import Context from '../state';
import EmptyView from '../../components/empty';
import ErrorView from '../../components/error';
import { getActions } from './utils';
import Sidebar from './sidebar';

const List = ({
  children,
  renderForm,
  renderTop,
  ...rest
}) => {
  const {
    resourceName,
    resourceNameSingular,
    collectionName,
    location,
    url,
    ...state
  } = React.useContext(Context);

  const { Redirect, canDelete } = useAuth(collectionName);
  const rows = get(state, resourceName, []);

  const actions = getActions(
    collectionName,
    canDelete && state.removeBulk ? state.removeBulk : null,
  );

  const renderTable = () => {
    if (state.fetching) return <TableSkeleton />;
    if (state.fetchingError) return <ErrorView />;
    if (!rows.length) return <EmptyView />;

    return (
      <Box>
        {renderTop && renderTop()}
        <Table
          {...state}
          {...rest}
          id={url}
          actions={actions}
        >
          {children(rows)}
        </Table>
      </Box>
    );
  };

  return (
    <Redirect op="Read" to="/">
      <Box mt={4} px={2}>
        <Sidebar renderAside={renderForm}>
          {renderTable()}
        </Sidebar>
      </Box>
    </Redirect>
  );
};

List.propTypes = {
  /**
   * Invokes a function with data from the REST services.
   */
  children: PropTypes.func.isRequired,

  /**
   * Will create a sidebar view if provided/
   */
  renderForm: PropTypes.func,

  /**
   * Will render a component directly above the Table
   */
  renderTop: PropTypes.func,
};

List.defaultProps = {
  renderForm: null,
  renderTop: null,
};

export default List;
