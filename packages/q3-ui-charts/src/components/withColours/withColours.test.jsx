import {
  isNotPureWhite,
  hexify,
  useThemeColourPalette,
} from './withColours';

jest.mock('@material-ui/core/styles', () => ({
  useTheme: jest.fn().mockReturnValue({
    palette: {
      secondary: {
        main: '111111',
      },
    },
  }),
}));

describe('withColours', () => {
  describe('"hexify"', () => {
    it('should prepend hex hash symbol', () =>
      expect(hexify('000')).toMatch('#000'));
  });

  describe('"isNotPureWhite"', () => {
    it('should pass non-white', () =>
      expect(isNotPureWhite('FF1FFF')).toBeTruthy());

    it('should detect white', () =>
      expect(isNotPureWhite('FFFFFF')).toBeFalsy());
  });

  describe('"useThemeColourPallete"', () =>
    expect(useThemeColourPalette().length).toBeGreaterThan(
      1,
    ));
});
