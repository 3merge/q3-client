import { useLocation } from '@reach/router';
import useSortPreference from './useSortPreference';
import useSort from './useSort';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('./useSortPreference');

test.each([
  ['name', undefined, '?sort=name'],
  ['-name', undefined, '?sort=-name'],
  ['name', '?active', '?active&sort=name'],
  ['name', '', '?sort=name'],
  ['-name', '', '?sort=-name'],
  ['name', '?', '?sort=name'],
  ['-name', '?', '?sort=-name'],
  ['name', '?name=foo', '?name=foo&sort=name'],
  ['-name', '?name=foo', '?name=foo&sort=-name'],
  ['-name', 'name=foo', 'name=foo&sort=-name'],
])('.useSort()', (preference, search, sort) => {
  useLocation.mockReturnValue({ search });
  useSortPreference.mockReturnValue({ sort: preference });

  expect(useSort('test', 'key')).toMatchObject({
    search: sort,
  });

  expect(useSortPreference).toHaveBeenCalledWith(
    'test',
    'key',
  );
});
