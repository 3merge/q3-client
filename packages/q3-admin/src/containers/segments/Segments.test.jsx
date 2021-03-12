import React from 'react';
import Segments from './Segments';
import { useActiveFilter } from '../../hooks';

jest.mock('../../hooks', () => ({
  useActiveFilter: jest.fn(),
}));

beforeEach(jest.clearAllMocks);

const checkEmptyRender = (disableSegments = true) =>
  global
    .shallow(
      <Segments disableSegments={disableSegments}>
        {jest.fn()}
      </Segments>,
    )
    .isEmptyRender();

test('should empty-render when no custom segments exist and disableSegments is true', () => {
  useActiveFilter.mockReturnValue({
    add: jest.fn(),
    filters: [],
  });

  expect(checkEmptyRender()).toBeTruthy();
});

test.each([
  [[{ searchValue: 'foo', label: 'bar' }], true],
  [[], false],
])(
  'should render when either custom segments exist or disableSegments is false',
  (filters, bool) => {
    useActiveFilter.mockReturnValue({
      add: jest.fn(),
      filters,
    });

    expect(checkEmptyRender(bool)).toBeFalsy();
  },
);
