/* eslint-disable no-param-reassign */
import React from 'react';
import Table from 'q3-ui-datatables';
import { useAuth } from 'q3-ui-permissions';
import { compact, get, invoke, isFunction } from 'lodash';
import ArticleHeightBox from '../../components/ArticleHeightBox';
import { Definitions, Store } from '../state';
import {
  useCollectionSseRefresh,
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

  const { canSeeSub } = useAuth(collectionName);

  useCollectionSseRefresh();

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

  return (
    <ArticleHeightBox>
      <Table
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
      />
    </ArticleHeightBox>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default withPageLoading(List);
