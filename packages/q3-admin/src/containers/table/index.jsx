/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { navigate } from '@reach/router';
import Table from 'q3-ui-datatables';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import { get } from 'lodash';
import { FilterChip } from 'q3-components';
import { makeStyles } from '@material-ui/core/styles';
import TableIo from '../TableIo';
import Article from '../../components/Article';
import SidePanel from '../../components/SidePanel';
import { Dispatcher, Definitions, Store } from '../state';
import { getActions } from './utils';
import TableHeader from '../TableHeader';
import Search from '../search';

const assignUrlPath = (base) => (item) => ({
  ...item,
  url: `${base}/${item.id}`,
});

const removeUrlPath = (filterUrl) => (item) => {
  if (filterUrl) delete item.url;
  return item;
};

export const TableDecorator = (props) => ({
  build: () => props,

  makeBlacklist: (fn) =>
    [
      ...get(props, 'allColumns', []),
      ...get(props, 'defaultColumns', []),
    ].filter((v) => !fn(v)),

  makeLinks: (root, removeUrl) =>
    get(props, 'data', [])
      .map(assignUrlPath(root))
      // sometimes, the URL is assigned from another module
      // even if we skipped the map above, it wouldn't ensure the URL prop removal
      .map(removeUrlPath(removeUrl)),
});

const executeNavigation = (query) =>
  navigate(
    `?${query.toString()}`,
    {
      state: {
        init: true,
      },
    },
    {
      replace: true,
    },
  );

const useStyle = makeStyles(() => ({
  table: {
    height: '100%',
    flex: 1,
  },
}));

const List = ({
  addComponent,
  filterComponent,
  HeaderProps,
  disableLink,
  disableSearch,
  io,
  ...rest
}) => {
  const { table } = useStyle();
  const tableProps = React.useContext(Store);

  const {
    collectionName,
    location,
    rootPath,
  } = React.useContext(Definitions);
  const { removeBulk } = React.useContext(Dispatcher);
  const { Redirect, canDelete, canSeeSub } = useAuth(
    collectionName,
  );

  const actions = getActions(
    collectionName,
    canDelete && removeBulk ? removeBulk : null,
  );

  const { state, update } = React.useContext(AuthContext);
  const decorator = TableDecorator({
    ...rest,
    ...tableProps,
  });

  const updateSortPrefence = (sort) => {
    const sorting = get(state, 'profile.sorting', {});
    sorting[collectionName] = sort;

    const q = new URLSearchParams(
      get(location, 'search', ''),
    );

    q.set('sort', sort);
    return update({ sorting }, () => executeNavigation(q));
  };

  return (
    <Redirect op="Read" to="/">
      <Article
        asideComponent={
          <SidePanel>{filterComponent}</SidePanel>
        }
      >
        <Table
          {...decorator.build()}
          blacklistColumns={decorator.makeBlacklist(
            canSeeSub,
          )}
          className={table}
          actionbarPosition="absolute"
          data={decorator.makeLinks(rootPath, disableLink)}
          actions={actions}
          id={collectionName}
          onSort={updateSortPrefence}
        >
          <TableHeader>
            <TableIo io={io} />
            {addComponent}
          </TableHeader>
          <Box pb={1}>
            <FilterChip />
          </Box>
        </Table>
      </Article>
    </Redirect>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
