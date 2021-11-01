/* eslint-disable no-param-reassign */
import React from 'react';
import Box from '@material-ui/core/Box';
import { navigate } from '@reach/router';
import Table from 'q3-ui-datatables';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import { get, invoke } from 'lodash';
import { url } from 'q3-ui-helpers';
import { FilterChip } from 'q3-components';
import { makeStyles } from '@material-ui/core/styles';
import { Dispatcher, Definitions, Store } from '../state';
import { useRefresh } from '../../hooks';
import TableActions from '../TableActions';
import TableLink from '../TableLink';
import TableTrash from '../TableTrash';

const assignUrlPath = (base) => (item) => {
  // property changed in previous update
  // now it's always "photo" from the API
  if (item && item.photo) item.imgSrc = item.photo;

  return {
    ...item,
    url: `${base}/${item.id}`,
  };
};

export const TableDecorator = (props) => ({
  build: () => ({
    ...props,
    renderCustomRowActions: (args) => {
      const renderWhenTruthy = (el, prop) =>
        get(props, prop, true)
          ? React.createElement(el, args)
          : null;

      return [
        invoke(props, 'renderCustomRowActions', args),
        renderWhenTruthy(TableLink, 'includeLink'),
        renderWhenTruthy(TableTrash, 'includeTrash'),
      ];
    },
  }),

  // getMultiselect?

  makeBlacklist: (fn) =>
    [
      ...get(props, 'allColumns', []),
      ...get(props, 'defaultColumns', []),
    ].filter((v) => !fn(v)),

  makeLinks: (root) =>
    get(props, 'data', []).map(assignUrlPath(root)),
});

const executeNavigation = (query) =>
  navigate(
    `?${url.toParamsString(query)}`,
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

const List = (props) => {
  const { table } = useStyle();
  const tableProps = React.useContext(Store);

  const {
    collectionName,
    location,
    rootPath,
  } = React.useContext(Definitions);
  const { poll } = React.useContext(Dispatcher);
  const { canSeeSub } = useAuth(collectionName);
  useRefresh(poll);

  const { state, update } = React.useContext(AuthContext);
  const decorator = TableDecorator({
    ...props,
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
      data={decorator.makeLinks(rootPath)}
      id={collectionName}
      onSort={updateSortPrefence}
      style={{
        height: '100%',
      }}
    >
      <TableActions {...props} />
      <Box py={0.5}>
        <FilterChip />
      </Box>
    </Table>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default List;

/**
if NO IO && NO DELETE 
bulkDelete

disableMultiselect
 */
