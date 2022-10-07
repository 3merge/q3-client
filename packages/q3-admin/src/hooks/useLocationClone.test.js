import { useContextMock } from 'q3-ui-test-utils/lib/reactUtils';
import { useLocation } from '@reach/router';
import useLocationClone from './useLocationClone';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

jest.mock('./useSortPreference', () =>
  jest.fn().mockReturnValue({
    sort: 'name',
  }),
);

beforeAll(() => {
  useContextMock().changeReturnValue({});
});

describe('useLocationClone', () => {
  it('should', () => {
    useLocation.mockReturnValue({
      search: '?test=true&sort=-updatedAt',
    });
    expect(
      useLocationClone().limit(500).sort('seq').build()
        .search,
      // see pref
    ).toBe('?test=true&sort=name&limit=500');
  });
});
