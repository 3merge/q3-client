/* eslint-disable no-param-reassign */
import React from 'react';
import DataTable from 'q3-ui-datatablesv2';
import Table from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import { compact, get, invoke, isFunction } from 'lodash';
import ArticleHeightBox from '../../components/ArticleHeightBox';
import { Dispatcher, Definitions, Store } from '../state';
import {
  useRefresh,
  useSortPreference,
  useMultiselect,
} from '../../hooks';
import withPageLoading from '../../helpers/withPageLoading';
import TableTrash from '../TableTrash';
import useStyle from './styles';

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

const List = (props) => {
  const { table } = useStyle();
  const tableProps = React.useContext(Store);

  const { collectionName, rootPath } =
    React.useContext(Definitions);

  const { poll } = React.useContext(Dispatcher);
  const { canSeeSub } = useAuth(collectionName);
  useRefresh(poll);

  const decorator = TableDecorator({
    ...props,
    ...tableProps,
  });

  const l = useSortPreference(
    collectionName,
    // eslint-disable-next-line
    props?.defaultSortPreference,
  );

  const multiselect = useMultiselect(props);

  /**
   * NEEDS TO HAVE CONFIGURATOR
   * NEEDS TO HAVE PROJECTION MAKER?
   */

  return (
    <ArticleHeightBox>
      <DataTable
        columns={[
          {
            component: 'avatar',
            field: 'photo',
            visible: true,
            width: 55,
            showLabel: false,
          },
          {
            field: 'name',
            visible: true,
            width: 150,
            sticky: true,
          },
          {
            field: 'firstName,lastName',
            format: 'object',
            sortable: false,
            visible: true,
            toFullName: true,
            width: 225,
            sticky: true,
          },
          {
            field: 'email',
            visible: true,
            sortable: true,
            component: 'email',
            width: 225,
          },
          {
            field: 'phone',
            visible: true,
            sortable: false,
            component: 'tel',
            toTel: true,
            width: 225,
            sticky: true,
          },
          {
            field: 'age',
            sortable: true,
            visible: false,
            width: 50,
          },
          {
            field: 'salary',
            sortable: true,
            toPrice: true,
            visible: true,
            width: 150,
          },
          {
            field: 'verified',
            visible: true,
            toCheck: true,
            width: 50,
          },
          {
            field: 'verified',
            visible: true,
            toTruthy: true,
            width: 50,
          },
        ]}
        data={decorator.makeLinks(rootPath)}
      />
      {/* <Table
        disableMultiselect={!multiselect}
        {...decorator.build()}
        blacklistColumns={decorator.makeBlacklist(
          canSeeSub,
        )}
        className={table}
        data={decorator.makeLinks(rootPath)}
        id={collectionName}
        onSort={l.update}
        sort={l.sort}
        disableExportsProvider
      /> */}
    </ArticleHeightBox>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default withPageLoading(List);
