import useAuthLinks from './useAuthLinks';
import useProfileLinks, {
  defaultProfileLinks,
} from './useProfileLinks';

jest.mock('./useAuthLinks');

describe('useProfileLinks', () => {
  it('should return only defaults', () => {
    useAuthLinks.mockReturnValue([null]);
    expect(useProfileLinks()).toEqual(defaultProfileLinks);
  });

  it('should return all', () => {
    useAuthLinks.mockReturnValue(['foo']);

    // one per invocation
    expect(useProfileLinks()).toEqual([
      'foo',
      'foo',
      'foo',
      'foo',
      ...defaultProfileLinks,
    ]);
  });
});
