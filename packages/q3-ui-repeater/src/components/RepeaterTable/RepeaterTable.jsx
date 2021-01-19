import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';
import { useAuth } from 'q3-ui-permissions';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Table } from '@material-ui/core';
import List from '../List';
import RepeaterContext from '../state';
import withMapRepeater from '../withMapRepeater';
import { override } from '../../helpers';
import usePagination from '../../usePagination';
import RepeaterCollapse from '../RepeaterCollapse';

const RepeaterTable = ({
  data,
  children,
  initialValues,
  disableEditor,
  disableRemove,
  disableMultiselect,
  renderNestedTableRow,
  bulkEditorComponent,
  perPage,
  groupName,
  ...rest
}) => {
  if (!array.hasLength(data)) return null;

  const { collectionName } = React.useContext(
    RepeaterContext,
  );
  const auth = useAuth(collectionName);
  const { totalPage, onChange, list } = usePagination(
    perPage,
    data,
  );

  return (
    <RepeaterCollapse label={groupName}>
      <Table>
        {list.length > 0 && (
          <List
            {...rest}
            data={list}
            disableEditor={disableEditor}
            disableMultiselect={
              disableMultiselect ||
              (!auth.canDelete && !bulkEditorComponent)
            }
            disableRemove={disableRemove}
            renderNestedTableRow={renderNestedTableRow}
            actionComponent={bulkEditorComponent}
          >
            {children}
          </List>
        )}
      </Table>
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          color="primary"
          count={totalPage}
          onChange={onChange}
        />
      </Box>
    </RepeaterCollapse>
  );
};

RepeaterTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  /**
   * Renderer for custom full-span TableRow component nesting.
   */
  renderNestedTableRow: PropTypes.func,
  perPage: PropTypes.number,
  ...override.propTypes,
};

RepeaterTable.defaultProps = {
  data: [],
  edit: null,
  renderNestedTableRow: null,
  perPage: 15,
  ...override.defaultProps,
};

export default withMapRepeater(RepeaterTable);
