import React from 'react';
import { get, map } from 'lodash';
import {
  Avatar,
  Box,
  Chip as MuiChip,
} from '@material-ui/core';
import * as icons from '@material-ui/icons';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import useColumns from '../useColumns';
import useStringHelper from '../useStringHelper';

const AvarComponent = ({
  children,
  iconObject,
  colorObject,
}) => {
  const Icon = get(
    icons,
    get(iconObject, children, 'BubbleChartIcon'),
    () => null,
  );

  return (
    <Box display="flex" justifyContent="space-between">
      {!iconObject ? (
        <Avatar src={children} />
      ) : (
        <Avatar
          style={{
            backgroundColor: get(colorObject, children),
            color: '#FFF',
          }}
        >
          <Icon />
        </Avatar>
      )}
    </Box>
  );
};
const Chip = ({ children, colorObject }) => (
  <MuiChip
    size="small"
    label={children}
    style={{
      backgroundColor: get(colorObject, children),
      color: '#FFF',
    }}
  />
);

const Email = ({ children }) => (
  <a href={`mailTo:${children}`}>{children}</a>
);

const Tel = ({ children }) => (
  <a href={`tel:${children}`}>{children}</a>
);

const EmptyDiv = ({ colorObject, children }) => (
  <span
    style={{
      color: get(colorObject, children),
    }}
  >
    {children}
  </span>
);

const Cell = ({ children, sticky, onLoad, ...props }) => {
  const InnerCellComponent =
    {
      avatar: AvarComponent,
      email: Email,
      tel: Tel,
      chip: Chip,
    }[props.component] || EmptyDiv;

  return (
    <td
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 'auto',
        position: sticky ? 'sticky' : 'relative',
        left: 0,
        background: 'white',
        padding: '.25rem',
        // border: '1px solid var(--background-muted)',
        borderRadius: 4,
      }}
    >
      <InnerCellComponent {...props}>
        {useStringHelper(children, props)}
      </InnerCellComponent>
    </td>
  );
};

/** UPDATE COLUMNS */
// onColumnChange(evn,newColumns){}
// ACTIONS includes link.

const DataTable = ({ columns, data }) => {
  const tableColumns = useColumns(columns, data);

  return (
    <div
      style={{
        overflow: 'auto',
        height: '100%',
        width: '100%',
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          height: '100%',
          width: '100%',
        }}
      >
        <thead>
          <tr>
            <th aria-label="checkbox" />
            {map(
              tableColumns,
              ({
                field,
                showLabel = true,
                sticky = false,
                width = 'auto',
              }) => (
                <th
                  key={field}
                  style={{
                    position: 'sticky',
                    top: 0,
                    left: sticky ? 0 : undefined,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width,
                    background: 'white',
                    zIndex: 1,
                    textAlign: 'left',
                    fontSize: 'small',
                  }}
                >
                  {showLabel !== false ? field : ''}
                </th>
              ),
            )}
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {map(data, (row) => (
            <tr
              key={row.id}
              style={{
                borderTop: '2px solid #f4f4f4',
                cursor: 'pointer',
              }}
            >
              <td style={{ textAlign: 'left' }}>
                <button>C</button>
              </td>
              {map(tableColumns, (column) => {
                const v = column.getValue(row);
                return (
                  <Cell key={column.field} {...column}>
                    {v}
                  </Cell>
                );
              })}
              <td style={{ textAlign: 'right' }}>
                <button>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
