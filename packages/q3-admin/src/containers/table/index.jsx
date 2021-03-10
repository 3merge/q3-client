/* eslint-disable no-param-reassign */
import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import Table from 'q3-ui-datatables';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import { get, isObject } from 'lodash';
import { url } from 'q3-ui-helpers';
import { FilterChip } from 'q3-components';
import { makeStyles } from '@material-ui/core/styles';
import TableIo from '../TableIo';
import { Dispatcher, Definitions, Store } from '../state';
import { getActions } from './utils';
import TableHeader from '../TableHeader';
import useSortPreference from '../../hooks/useSortPreference';

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

const useStyle = makeStyles(() => ({
  table: {
    marginTop: 0,
    height: '100%',
    flex: 1,
  },
}));

const List = ({ disableLink, io, children, ...rest }) => {
  const { table } = useStyle();
  const tableProps = React.useContext(Store);
  const { collectionName, rootPath } = React.useContext(
    Definitions,
  );

  const { canSeeSub } = useAuth(collectionName);
  const decorator = TableDecorator({
    ...rest,
    ...tableProps,
  });

  return (
    <Table
      {...decorator.build()}
      disableMultiselect={!isObject(io)}
      blacklistColumns={decorator.makeBlacklist(canSeeSub)}
      className={table}
      actionbarPosition="absolute"
      data={decorator.makeLinks(rootPath, disableLink)}
      id={collectionName}
      onSort={useSortPreference()}
      style={{ height: '100%' }}
    >
      {children}
    </Table>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default List;
