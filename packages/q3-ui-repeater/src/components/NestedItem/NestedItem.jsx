import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useToggle } from 'useful-state';
import useStyle from '../useStyle';
import Item from '../Item';

export const FullSpanTableRow = ({ children }) => {
  const { tableRow } = useStyle();
  return (
    <TableRow className={tableRow}>
      <TableCell colSpan="100%">{children}</TableCell>
    </TableRow>
  );
};

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
  const { state, toggle } = useToggle(true);

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
          {!state ? renderNestedTableRow(item, rest) : null}
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

export default React.memo(NestedItem, (prev, curr) =>
  isEqual(prev?.item, curr?.item),
);
