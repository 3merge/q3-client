import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import TableBody from '@material-ui/core/TableBody';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NestedItem from '../NestedItem';
import { hasDataPropChangedShape } from '../../helpers';

export const searchObject = (item = {}) => (value = '') =>
  !value.length ||
  new RegExp(value, 'gi').test(JSON.stringify(item));

const List = ({
  children,
  data,
  createRenderer,
  renderNestedTableRow,
  ...rest
}) => {
  const theme = useTheme();
  const showAttributes = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const attributes = get(rest, 'cardProps.attributes', []);
  console.log('ONLY ONE');

  return (
    <TableBody>
      {data.map((item, i) => (
        <NestedItem
          key={`nestedItem${i}`}
          renderNestedTableRow={renderNestedTableRow}
          attributes={attributes}
          showAttributes={showAttributes}
          parent={data}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderNestedTableRow: PropTypes.func,
  createRenderer: PropTypes.node,
};

List.defaultProps = {
  createRenderer: null,
  renderNestedTableRow: null,
};

export default List;
