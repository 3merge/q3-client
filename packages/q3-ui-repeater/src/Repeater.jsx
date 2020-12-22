import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Table, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    <Accordion
      defaultExpanded
      style={{
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        style={{
          borderBottom: '2px solid #F5F7F9',
          flexDirection: 'row-reverse',
          margin: 0,
          padding: '.5rem .25rem',
          minHeight: 36,
          height: 36,
        }}
      >
        {groupName && (
          <Typography
            variant="overline"
            style={{ marginLeft: '1rem' }}
          >
            {groupName}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        <Box width="100%">
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
            my={2}
          >
            <Pagination
              color="primary"
              count={totalPage}
              onChange={onChange}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
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
