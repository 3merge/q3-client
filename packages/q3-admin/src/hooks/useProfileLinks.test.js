import useAuthLinks from './useAuthLinks';
import useProfileLinks from './useProfileLinks';

jest.mock('./useAuthLinks');

describe('useProfileLinks', () => {
  it('should return only defaults', () => {
    useAuthLinks.mockReturnValue([null]);
    expect(useProfileLinks()).toEqual([
      {
        onClick: expect.any(Function),
        text: 'logout',
      },
    ]);
  });

  it('should return all', () => {
    useAuthLinks.mockReturnValue(['foo']);

    // one per invocation
    expect(useProfileLinks()).toEqual([
      'foo',
      'foo',
      'foo',
      'foo',
      'foo',
      expect.any(Object),
    ]);
  });
});
