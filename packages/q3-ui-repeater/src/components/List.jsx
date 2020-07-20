import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RepeaterState from './state';
import Search from './Search';
import NestedItem from './NestedItem';
import ActionBar from './ActionBar';

export const searchObject = (item = {}) => (value = '') =>
  !value.length ||
  new RegExp(value, 'gi').test(JSON.stringify(item));

const List = ({
  children,
  data,
  actionComponent,
  createRenderer,
  renderNestedTableRow,
  ...rest
}) => {
  const {
    search: { value },
  } = React.useContext(RepeaterState);

  const { t } = useTranslation('labels');

  const theme = useTheme();
  const showAttributes = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const attributes = get(rest, 'cardProps.attributes', []);

  const testSearchTerm = (item) =>
    !value.length ||
    new RegExp(value, 'gi').test(JSON.stringify(item));

  const filtered = data.filter(testSearchTerm);

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            style={{
              borderBottom: !showAttributes
                ? 'none !important'
                : undefined,
            }}
          >
            <Search
              {...rest}
              ids={filtered.map((item) => item.id)}
            />
          </TableCell>
          <ActionBar
            data={data}
            renderSelected={actionComponent}
            renderUnselected={
              showAttributes
                ? attributes.map((name) => (
                    <TableCell component="th">
                      {t(name)}
                    </TableCell>
                  ))
                : null
            }
          />
        </TableRow>
      </TableHead>
      <TableBody>
        {filtered.map((item, i) => (
          <NestedItem
            key={i}
            renderNestedTableRow={renderNestedTableRow}
            attributes={attributes}
            showAttributes={showAttributes}
            parent={filtered}
            item={item}
            index={i}
            {...rest}
          >
            {children}
          </NestedItem>
        ))}
      </TableBody>
    </>
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
