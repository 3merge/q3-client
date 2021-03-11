import React from 'react';
import Segments from './Segments';
import { useActiveFilter } from '../../hooks';

jest.mock('../../hooks', () => ({
  useActiveFilter: jest.fn(),
}));

beforeEach(jest.clearAllMocks);

test('should empty-render when no custom segments exist and disableSegments is true', () => {
  useActiveFilter.mockReturnValue({
    add: jest.fn(),
    filters: [],
  });

  const wrapper = global.shallow(
    <Segments disableSegments={true}>{jest.fn()}</Segments>,
  );
  expect(wrapper.isEmptyRender()).toBeTruthy();
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

    const wrapper = global.shallow(
      <Segments disableSegments={bool}>
        {jest.fn()}
      </Segments>,
    );
    expect(wrapper.isEmptyRender()).toBeFalsy();
  },
);
