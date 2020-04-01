/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Table from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import { Dispatcher, Definitions, Store } from '../state';
import { getActions } from './utils';
import useHeight from '../../components/sidebar/useHeight';
import { useReferrer } from '../use';

export const ListContainer = ({ children, overflowY }) => {
  const height = useHeight();
  return (
    <Box style={{ height, overflowY }}>
      <Box my={3} px={2}>
        {children}
      </Box>
    </Box>
  );
};

ListContainer.propTypes = {
  overflowY: PropTypes.string,
};

ListContainer.defaultProps = {
  overflowY: 'auto',
};

const List = ({ renderForm, renderTop, ...rest }) => {
  const height = useHeight();
  const tableProps = React.useContext(Store);
  const { collectionName } = React.useContext(Definitions);
  const { removeBulk } = React.useContext(Dispatcher);
  const { Redirect, canDelete } = useAuth(collectionName);
  const { setPath } = useReferrer();

  const actions = getActions(
    collectionName,
    canDelete && removeBulk ? removeBulk : null,
  );

  return (
    <Redirect op="Read" to="/">
      <Box style={{ height, overflowY: 'scroll' }}>
        <Box my={3} px={2}>
          {renderTop && renderTop()}
          <Table
            {...rest}
            {...tableProps}
            actions={actions}
            id={collectionName}
            renderFilter={renderForm}
            onClick={setPath}
          />
        </Box>
      </Box>
    </Redirect>
  );
};

List.propTypes = {
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
