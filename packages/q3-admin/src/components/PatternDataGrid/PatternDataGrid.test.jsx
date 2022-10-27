import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PatternDataGrid from './PatternDataGrid';
import { usePatternData } from '../../hooks';

jest.mock('../../hooks', () => ({
  usePatternData: jest.fn(),
}));

const getColumns = (props) =>
  global
    .shallow(<PatternDataGrid report="test" {...props} />)
    .find(DataGrid)
    .prop('columns');

describe('PatternDataGrid', () => {
  it('should return empty array', () => {
    usePatternData.mockReturnValue({
      data: null,
    });

    expect(getColumns()).toEqual([]);
  });

  it('should return keys from first response', () => {
    const row = {
      name: 'john',
      age: 21,
      balance: 30021,
    };
    usePatternData.mockReturnValue({
      data: [row],
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
        row,
      }),
    ).toBe('$30,021.00');
  });
});
