import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { useToggle } from 'useful-state';
import NestedItem from './NestedItem';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue([true, jest.fn()]),
}));

beforeEach(() => {
  useToggle.mockClear();
});

describe('NestedItem', () => {
  it('should not render nested table', () => {
    expect(
      global
        .shallow(<NestedItem />)
        .find(TableRow)
        .exists(),
    ).toBeFalsy();
  });

  it('should render nested table', () => {
    const fn = jest.fn().mockReturnValue(null);

    expect(
      global
        .shallow(<NestedItem renderNestedTableRow={fn} />)
        .find(TableRow)
        .exists(),
    ).toBeTruthy();
    expect(fn).toHaveBeenCalled();
  });
});
