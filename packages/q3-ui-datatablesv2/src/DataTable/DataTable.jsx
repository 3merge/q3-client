import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import Cell from '../Cell';
import ColumnAdd from '../ColumnAdd';
import ColumnReorderButton from '../ColumnReorderButton';
import Head from '../Head';
import useAssetMap from '../useAssetMap';
import useColumns from '../useColumns';
import useStyle from './styles';

const DataTable = ({
  actionComponent: ActionComponent,
  checkboxComponent: CheckboxComponent,
  columns,
  colorMap,
  iconMap,
  data,
  onColumnAdd,
  onColumnChange,
  onColumnReorder,
  onSortChange,
}) => {
  const tableColumns = useColumns(columns, data);
  const cls = useStyle();

  const configurationObject = {
    columns,
    onColumnChange,
    onColumnReorder,
  };

  const { getColor, getIcon } = useAssetMap({
    colorMap,
    iconMap,
  });

  const getColspanValue = React.useCallback(() => {
    let output = size(tableColumns);

    // needs to check isDeveloper
    // eslint-disable-next-line
    if (ActionComponent || true) output += 1;
    if (CheckboxComponent) output += 1;
    return output;
  }, [tableColumns]);

  const renderColumn = (row) =>
    React.useCallback(
      (column) => {
        const { field } = column;
        const value = column.getValue(row);
        const color = getColor(value);
        const icon = getIcon(value);

        return (
          <Cell
            {...column}
            color={color}
            icon={icon}
            key={field}
          >
            {value}
          </Cell>
        );
      },

      // don't bother changing for icons or colours
      [JSON.stringify(row)],
    );

  return (
    <div className={cls.root}>
      <table className={cls.table}>
        <thead>
          <tr>
            {CheckboxComponent && (
              <th
                aria-label="checkbox"
                className={classnames(
                  cls.checkbox,
                  cls.head,
                )}
              >
                <CheckboxComponent />
              </th>
            )}
            {map(tableColumns, (column) => (
              <Head
                {...configurationObject}
                {...column}
                key={column.field}
                onSortChange={onSortChange}
              />
            ))}
            <th
              aria-label="actions"
              className={classnames(cls.actions, cls.head)}
            >
              <ColumnReorderButton
                {...configurationObject}
              />
              <ColumnAdd onColumnAdd={onColumnAdd} />
            </th>
          </tr>
        </thead>
        <tbody>
          {map(data, (row) => (
            <tr className={cls.row} key={row.id}>
              {CheckboxComponent && (
                <td className={cls.checkbox}>
                  <CheckboxComponent id={row.id} />
                </td>
              )}
              {map(tableColumns, renderColumn(row))}
              <td className={cls.actions}>
                {ActionComponent && <ActionComponent />}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              className={cls.foot}
              colSpan={getColspanValue()}
            >
              Pagination.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

DataTable.defaultProps = {
  colorMap: {},
};

DataTable.propTypes = {
  colorMap: PropTypes.shape({}),
  onColumnReorder: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default DataTable;
