import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PatternDataGrid from './PatternDataGrid';
import { useReportById } from '../../hooks';

jest.mock('../../hooks', () => ({
  useReportById: jest.fn(),
}));

const getColumns = (props) =>
  global
    .shallow(<PatternDataGrid report="test" {...props} />)
    .find(DataGrid)
    .prop('columns');

describe('PatternDataGrid', () => {
  it('should return empty array', () => {
    useReportById.mockReturnValue({
      data: null,
    });

    expect(getColumns()).toEqual([]);
  });

  it('should return keys from first response', () => {
    useReportById.mockReturnValue({
      data: [
        {
          name: 'john',
          age: 21,
          balance: 30021,
        },
      ],
    });

    const columns = getColumns({
      formatters: {
        balance: 'price',
      },
      width: {
        name: 185,
      },
    });

    expect(columns).toEqual([
      {
        field: 'name',
        headerName: 'name',
        minWidth: 185,
        renderCell: expect.any(Function),
      },
      {
        field: 'age',
        headerName: 'age',
        flex: 1,
        renderCell: expect.any(Function),
      },
      {
        field: 'balance',
        headerName: 'balance',
        flex: 1,
        renderCell: expect.any(Function),
      },
    ]);

    expect(
      columns[2].renderCell({
        // we're stubbing out what should have been 30021
        value: 10000,
      }),
    ).toBe('$10,000.00');
  });
});
