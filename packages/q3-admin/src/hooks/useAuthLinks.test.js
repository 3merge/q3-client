import { useAuth, test } from 'q3-ui-permissions';
import useAuthLinks from './useAuthLinks';

const populated = [1, 2, 3];

jest.mock('q3-ui-permissions', () => {
  const fn = jest.fn();

  return {
    test: fn,
    useAuth: jest.fn().mockReturnValue({
      canSee: true,
      canCreate: false,
      test: fn,
    }),
  };
});

describe('useAuthLinks', () => {
  it('should invoke test', () => {
    expect(
      useAuthLinks('conduct', 'test', populated, '1'),
    ).toEqual([]);

    expect(useAuth).toHaveBeenCalledWith('conduct');
    expect(test).toHaveBeenCalledWith('1');
  });

  it('should return empty array', () => {
    expect(
      useAuthLinks('conduct', 'canCreate', populated),
    ).toEqual([]);
  });

  it('should return output', () => {
    expect(
      useAuthLinks('conduct', 'canSee', populated),
    ).toEqual(populated);
  });
});
