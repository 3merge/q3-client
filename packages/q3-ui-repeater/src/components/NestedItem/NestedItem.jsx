import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useToggle } from 'useful-state';
import useStyle from '../useStyle';
import Item from '../Item';

const NestedItem = ({
  children,
  item,
  renderNestedTableRow,
  ...rest
}) => {
  const { state, toggle } = useToggle(true);
  const { tableRow } = useStyle();

  return (
    <>
      <Item
        hasNested={Boolean(renderNestedTableRow)}
        toggleNested={toggle}
        nestedIsVisible={!state}
        renderNestedTableRow={renderNestedTableRow}
        item={item}
        {...rest}
      >
        {children}
      </Item>
      {renderNestedTableRow && (
        <TableRow className={tableRow}>
          <TableCell colSpan="100%">
            {!state
              ? renderNestedTableRow(item, rest)
              : null}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

NestedItem.propTypes = {
  children: PropTypes.node.isRequired,
  item: PropTypes.shape({
    item: PropTypes.string,
  }).isRequired,
  renderNestedTableRow: PropTypes.func,
};

NestedItem.defaultProps = {
  renderNestedTableRow: null,
};

export default React.memo(NestedItem, (prev, curr) =>
  isEqual(prev?.item, curr?.item),
);
