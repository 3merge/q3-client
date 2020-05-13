/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { navigate } from '@reach/router';
import Table from 'q3-ui-datatables';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import { get } from 'lodash';
import { Dispatcher, Definitions, Store } from '../state';
import { getActions } from './utils';
import useHeight from '../../components/sidebar/useHeight';
import { useReferrer } from '../use';
import Section from '../../components/section';
import Sidebar from '../../components/sidebar';
import Search from '../search';
import Header from '../header';

export const ListContainer = ({ children, overflowY }) => {
  const height = useHeight();
  return (
    <Box style={{ height, overflowY }}>
      <Box my={2.5} px={1}>
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

const List = ({
  renderForm,
  renderTop,
  filters,
  addComponent,
  ...rest
}) => {
  const tableProps = React.useContext(Store);
  const { collectionName, location } = React.useContext(
    Definitions,
  );
  const { removeBulk } = React.useContext(Dispatcher);
  const { Redirect, canDelete } = useAuth(collectionName);
  const { setPath } = useReferrer();

  const actions = getActions(
    collectionName,
    canDelete && removeBulk ? removeBulk : null,
  );

  const { state, update } = React.useContext(AuthContext);

  const updateSortPrefence = (sort) => {
    const sorting = get(state, 'profile.sorting', {});
    sorting[collectionName] = sort;

    const q = new URLSearchParams(
      get(location, 'search', ''),
    );

    q.set('sort', sort);

    return update(
      {
        sorting,
      },
      () =>
        navigate(
          `?${q.toString()}`,
          {
            state: {
              init: true,
            },
          },
          {
            replace: true,
          },
        ),
    );
  };

  return (
    <Redirect op="Read" to="/">
      <Section
        renderOutside={<Sidebar>{filters}</Sidebar>}
        renderInside={
          <Box>
            <Header>
              <Search {...rest} />
            </Header>
            {addComponent}
            <Table
              {...rest}
              {...tableProps}
              actions={actions}
              id={collectionName}
              onClick={setPath}
              onSort={updateSortPrefence}
            />
          </Box>
        }
      />
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
