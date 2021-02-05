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
import { useAppContext } from '../../hooks';

const assignUrlPath = (base) => (item) => {
  // property changed in previous update
  // now it's always "photo" from the API
  if (item && item.photo) item.imgSrc = item.photo;

  return {
    ...item,
    url: `${base}/${item.id}`,
  };
};

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
    marginTop: 0,
    height: '100%',
    flex: 1,
  },
}));

const List = ({
  addComponent,
  HeaderProps,
  disableLink,
  disableSearch,
  io,
  ...rest
}) => {
  const { table } = useStyle();
  const tableProps = React.useContext(Store);

  const { can } = useAppContext({
    io: <TableIo io={io} data={tableProps.data} />,
    add: addComponent,
  });

  const {
    collectionName,
    location,
    rootPath,
  } = React.useContext(Definitions);
  const { removeBulk } = React.useContext(Dispatcher);
  const { canDelete, canSeeSub } = useAuth(collectionName);

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
    <Table
      {...decorator.build()}
      blacklistColumns={decorator.makeBlacklist(canSeeSub)}
      className={table}
      actionbarPosition="absolute"
      data={decorator.makeLinks(rootPath, disableLink)}
      actions={actions}
      id={collectionName}
      onSort={updateSortPrefence}
      style={{ height: '100%' }}
    >
      <TableHeader>
        {can('io')}
        {can('add')}
      </TableHeader>
      <Box py={0.5}>
        <FilterChip />
      </Box>
    </Table>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
