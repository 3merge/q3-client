import useRelativePath from './useRelativePath';
import useDomainContext from './useDomainContext';

jest.mock('./useDomainContext');

describe('useRelativePath', () => {
  it('should return default', () => {
    expect(useRelativePath()).toEqual('/');
  });

  it('should combine', () => {
    useDomainContext.mockReturnValue({
      directory: '/app',
    });

    expect(useRelativePath('test')).toEqual('/app/test');
  });

  it('should remove unnecessary slashes', () => {
    useDomainContext.mockReturnValue({
      directory: '/',
    });

    expect(useRelativePath('test')).toEqual('/test');
  });
});
