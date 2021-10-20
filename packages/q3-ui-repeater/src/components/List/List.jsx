import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import TableBody from '@material-ui/core/TableBody';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NestedItem from '../NestedItem';
import RepeaterTableContext from '../RepeaterTableContext';

const List = ({
  children,
  createRenderer,
  renderNestedTableRow,
  ...rest
}) => {
  const theme = useTheme();
  const showAttributes = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const { data } = React.useContext(RepeaterTableContext);
  const attributes = get(rest, 'cardProps.attributes', []);

  return (
    <TableBody>
      {data.map((item, i) => (
        <NestedItem
          key={`nestedItem${i}`}
          renderNestedTableRow={renderNestedTableRow}
          attributes={attributes}
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

export default List;
