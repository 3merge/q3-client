import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RepeaterState from './state';
import Search from './Search';
import Item from './Item';

const List = ({
  children,
  data,
  createRenderer,
  ...rest
}) => {
  const {
    search: { value },
  } = React.useContext(RepeaterState);

  const theme = useTheme();
  const showAttributes = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const attributes = get(rest, 'cardProps.attributes', []);

  const testSearchTerm = (item) =>
    !value.length ||
    new RegExp(value, 'gi').test(JSON.stringify(item));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Search />
          </TableCell>
          {showAttributes
            ? attributes.map((name) => (
                <TableCell item>{name}</TableCell>
              ))
            : null}

          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.filter(testSearchTerm).map((item, i) => (
          <Item
            key={i}
            showAttributes={showAttributes}
            parent={data}
            item={item}
            index={i}
            {...rest}
          >
            {children}
          </Item>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={attributes.length + 2}>
            {createRenderer}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
