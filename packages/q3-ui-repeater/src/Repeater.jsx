import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Table } from '@material-ui/core';
import { List } from './components';
import { override } from './helpers';
import usePagination from './usePagination';
import withMapRepeater from './withMapRepeater';

const Repeater = ({
  data,
  children,
  initialValues,
  collectionName,
  disableEditor,
  disableRemove,
  disableMultiselect,
  renderNestedTableRow,
  bulkEditorComponent,
  perPage,
  groupName,
  ...rest
}) => {
  const auth = useAuth(collectionName);
  const { totalPage, onChange, list } = usePagination(
    perPage,
    data,
  );

  return (
    <Box mt={3}>
      {groupName && <span>{groupName}</span>}
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
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
        mb={5}
      >
        <Pagination
          color="primary"
          count={totalPage}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

Repeater.propTypes = {
  collectionName: PropTypes.string,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
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

Repeater.defaultProps = {
  data: [],
  collectionName: null,
  edit: null,
  renderNestedTableRow: null,
  perPage: 15,
  ...override.defaultProps,
};

export default withMapRepeater(Repeater);
