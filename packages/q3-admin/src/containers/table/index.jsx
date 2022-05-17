/* eslint-disable no-param-reassign */
import React from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import Table from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import { compact, get, invoke, isFunction } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Dispatcher, Definitions, Store } from '../state';
import {
  useRefresh,
  useSortPreference,
  useBulkDeleteFunction,
  useDatatableActions,
} from '../../hooks';
import withPageLoading from '../../helpers/withPageLoading';
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
    renderCustomRowActions: (args, context) => {
      const subkey = context?.id;
      const customEl = invoke(
        props,
        'renderCustomRowActions',
        args,
      );

      const renderWhenTruthy = (el, prop) =>
        get(props, prop, true)
          ? React.createElement(el, {
              key: `${el.displayName}-${subkey}`,
              ...args,
            })
          : null;

      return compact([
        customEl ? (
          <React.Fragment
            key={`custom-actions-wrapper-${subkey}`}
          >
            {customEl}
          </React.Fragment>
        ) : null,
        renderWhenTruthy(TableTrash, 'includeTrash'),
      ]);
    },
  }),

  makeBlacklist: (fn) => {
    const blacklist = get(props, 'blacklistColumns', []);

    return compact(
      [
        ...get(props, 'allColumns', []),
        ...get(props, 'defaultColumns', []),
      ]
        .filter((v) => !fn(v))
        .concat(
          isFunction(blacklist)
            ? blacklist(props?.data)
            : blacklist,
        ),
    ).flat();
  },

  makeLinks: (root) =>
    get(props, 'data', []).map(assignUrlPath(root)),
});

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
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  const { collectionName, rootPath } =
    React.useContext(Definitions);

  const { poll } = React.useContext(Dispatcher);
  const { canSeeSub } = useAuth(collectionName);
  useRefresh(poll);

  const tableActions = useDatatableActions(
    get(props, 'io', {}),
  );

  const decorator = TableDecorator({
    ...props,
    ...tableProps,
  });

  const l = useSortPreference(
    collectionName,
    // eslint-disable-next-line
    props?.defaultSortPreference,
  );

  return (
    <Box
      p={{
        xs: 1,
        sm: 1,
        md: 2,
      }}
      style={{
        paddingTop: 0,
      }}
    >
      <Table
        {...decorator.build()}
        {...tableActions}
        blacklistColumns={decorator.makeBlacklist(
          canSeeSub,
        )}
        className={table}
        data={decorator.makeLinks(rootPath)}
        id={collectionName}
        onRemove={useBulkDeleteFunction()}
        onSort={l.update}
        sort={l.sort}
        disableExportsProvider
        style={{
          maxHeight: isMobile ? '100%' : '85vh',
        }}
      />
    </Box>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default withPageLoading(List);
