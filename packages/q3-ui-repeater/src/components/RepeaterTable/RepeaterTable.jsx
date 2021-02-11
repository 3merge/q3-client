import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Table } from '@material-ui/core';
import List from '../List';
import withMapRepeater from '../withMapRepeater';
import { override } from '../../helpers';
import usePagination from '../../usePagination';
import RepeaterCollapse from '../RepeaterCollapse';

const gt = (v, num = 0) => v > num;

const RepeaterTable = ({
  data,
  children,
  initialValues,
  disableEditor,
  disableRemove,
  disableMultiselect,
  renderNestedTableRow,
  perPage,
  groupName,
  ...rest
}) => {
  const {
    totalPage,
    total,
    onChange,
    list,
    page,
  } = usePagination(perPage, data);

  return (
    gt(total, 0) && (
      <RepeaterCollapse label={groupName}>
        <Table>
          <List
            {...rest}
            data={list}
            renderNestedTableRow={renderNestedTableRow}
          >
            {children}
          </List>
        </Table>
        {gt(totalPage, 1) && (
          <Box
            display="flex"
            justifyContent="center"
            mt="20px"
          >
            <Pagination
              page={page}
              color="primary"
              count={totalPage}
              onChange={onChange}
              size="small"
            />
          </Box>
        )}
      </RepeaterCollapse>
    )
  );
};

RepeaterTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
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
