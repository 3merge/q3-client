const { containsRenderFilterPropFn } = require('./utils');

describe('"Menu utils"', () => {
  describe('"containsRenderFilterPropFn"', () => {
    it('should return falsey', () =>
      expect(containsRenderFilterPropFn({})).toBeFalsy());

    it('should return truthy', () =>
      expect(
        containsRenderFilterPropFn({
          renderFilter: jest.fn(),
        }),
      ).toBeTruthy());
  });
});
