import useAuthLinks from './useAuthLinks';
import useDomainLinks from './useDomainLinks';

jest.mock('./useAuthLinks');

describe('useDomainLinks', () => {
  it('should redact all', () => {
    useAuthLinks.mockReturnValue([null]);
    expect(useDomainLinks()).toEqual([]);
  });

  it('should return all', () => {
    useAuthLinks.mockReturnValue(['foo']);

    // one per invocation
    expect(useDomainLinks()).toEqual([
      'foo',
      'foo',
      'foo',
      'foo',
      'foo',
    ]);
  });
});
