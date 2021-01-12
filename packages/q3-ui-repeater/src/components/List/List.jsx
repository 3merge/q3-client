import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NestedItem from '../NestedItem';

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
  const { t } = useTranslation('labels');

  const theme = useTheme();
  const showAttributes = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const attributes = get(rest, 'cardProps.attributes', []);

  return (
    <>
      {/* <TableHead>
        <TableRow>
          <TableCell />
          <ActionBar
            data={data}
            renderSelected={actionComponent}
            renderUnselected={
              showAttributes
                ? attributes.map((name) => (
                    <TableCell
                      component="th"
                      style={{ padding: 0 }}
                    >
                      {t(name)}
                    </TableCell>
                  ))
                : null
            }
          />
        </TableRow>
      </TableHead> */}
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
