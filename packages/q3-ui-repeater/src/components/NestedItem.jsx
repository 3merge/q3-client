import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useToggle } from 'useful-state';
import Item from './Item';

export const FullSpanTableRow = ({ children }) => (
  <TableRow>
    <TableCell colSpan="100%">{children}</TableCell>
  </TableRow>
);

FullSpanTableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

const NestedItem = ({
  attributes,
  children,
  item,
  renderNestedTableRow,
  ...rest
}) => {
  const { state, toggle } = useToggle();

  return (
    <>
      <Item
        hasNested={Boolean(renderNestedTableRow)}
        toggleNested={toggle}
        nestedIsVisible={!state}
        renderNestedTableRow={renderNestedTableRow}
        attributes={attributes}
        item={item}
        {...rest}
      >
        {children}
      </Item>
      {renderNestedTableRow && (
        <FullSpanTableRow attributes={attributes}>
          <Collapse in={!state}>
            <Box>{renderNestedTableRow(item)}</Box>
          </Collapse>
        </FullSpanTableRow>
      )}
    </>
  );
};

NestedItem.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  item: PropTypes.shape({
    item: PropTypes.string,
  }).isRequired,
  renderNestedTableRow: PropTypes.func,
};

NestedItem.defaultProps = {
  attributes: [],
  renderNestedTableRow: null,
};

export default NestedItem;
