import React from 'react';
import { useActiveQueryParams } from 'q3-ui-queryparams';
import FilterChip from './FilterChip';
import FilterChipExpandable from '../FilterChipExpandable';

jest.mock('q3-ui-queryparams', () => ({
  useActiveQueryParams: jest.fn(),
}));

describe('FilterChip', () => {
  it('should render empty', () => {
    useActiveQueryParams.mockReturnValue([]);
    expect(
      global.shallow(<FilterChip />).exists(),
    ).toBeTruthy();
  });

  it('should render empty', () => {
    useActiveQueryParams.mockReturnValue([
      {
        label: 'Testing',
        onDelete: jest.fn(),
      },
    ]);
    expect(
      global
        .shallow(<FilterChip />)
        .find(FilterChipExpandable),
    ).toHaveLength(1);
  });
});
