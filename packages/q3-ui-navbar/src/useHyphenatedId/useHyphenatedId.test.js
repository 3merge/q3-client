import useHyphenatedId from './useHyphenatedId';

describe('useHyphenatedId', () => {
  it('should join together', () => {
    expect(useHyphenatedId('foo')('bar')).toMatch(
      'foo-bar',
    );
  });
});
