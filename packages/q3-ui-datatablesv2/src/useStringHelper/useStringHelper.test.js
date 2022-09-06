import useStringHelper from './useStringHelper';

describe('useStringHelper', () => {
  it('should match with corresponding string method', () => {
    expect(
      useStringHelper('134999', {
        toPrice: true,
      }),
    ).toMatch('$134,999');
  });

  it('should return self', () => {
    expect(
      useStringHelper('134999', {
        toUnknown: true,
      }),
    ).toMatch('134999');
  });
});
