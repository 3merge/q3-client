import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NestedItem from '../NestedItem';
import RepeaterTableContext from '../RepeaterTableContext';

const List = ({
  children,
  createRenderer,
  renderNestedTableRow,
  ...rest
}) => {
  const { data } = React.useContext(RepeaterTableContext);
  const showAttributes = useMediaQuery((theme) =>
    theme.breakpoints.up('md'),
  );

  return (
    <TableBody>
      {data.map((item, i) => (
        <NestedItem
          key={`nestedItem${i?.id || i}`}
          renderNestedTableRow={renderNestedTableRow}
          showAttributes={showAttributes}
          item={item}
          index={i}
          {...rest}
        >
          {children}
        </NestedItem>
      ))}
    </TableBody>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  renderNestedTableRow: PropTypes.func,
  createRenderer: PropTypes.node,
};

List.defaultProps = {
  createRenderer: null,
  renderNestedTableRow: null,
};

export default React.memo(List);
