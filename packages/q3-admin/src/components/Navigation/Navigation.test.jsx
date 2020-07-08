import { isPartialMatch } from './Navigation';

describe('"Admin>isPartialMatch"', () => {
  it('should match without leading', () =>
    expect(isPartialMatch('/foo', 'foo')).toBeTruthy());

  it('should match subdirectories', () =>
    expect(
      isPartialMatch('/foo', '/foo/123'),
    ).toBeTruthy());

  it('should not match', () =>
    expect(isPartialMatch('/foo', 'bar')).toBeFalsy());
});
