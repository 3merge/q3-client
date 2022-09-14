/* eslint-disable no-param-reassign */
import React from 'react';
import DataTable from 'q3-ui-datatablesv2';
import ArticleHeightBox from '../../components/ArticleHeightBox';
import CollectionMultiselect from '../../components/CollectionMultiselect';
import Pagination from '../Pagination';
import { Dispatcher, Definitions, Store } from '../state';
import {
  useDataTable,
  useRefresh,
  useSortPreference,
} from '../../hooks';
import withPageLoading from '../../helpers/withPageLoading';
import TableRowActions from '../TableRowActions';

const List = (props) => {
  const tableProps = React.useContext(Store);
  const { collectionName, columns } =
    React.useContext(Definitions);
  const { poll } = React.useContext(Dispatcher);

  useRefresh(poll);

  const l = useSortPreference(
    collectionName,
    // eslint-disable-next-line
    props?.defaultSortPreference,
  );

  console.log(l.sort);

  return (
    <ArticleHeightBox>
      <DataTable
        {...props}
        {...tableProps}
        {...useDataTable()}
        actionComponent={TableRowActions}
        checkboxComponent={CollectionMultiselect}
        paginationComponent={Pagination}
        columns={columns}
        onSort={l.update}
      />
    </ArticleHeightBox>
  );
};

List.propTypes = {};
List.defaultProps = {};

export default withPageLoading(List);
