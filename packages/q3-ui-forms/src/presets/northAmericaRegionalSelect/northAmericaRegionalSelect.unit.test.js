import { getRegions, CA, US } from '.';

const measureLengthOfReturnValue = (country, len) =>
  expect(getRegions({ country })).toHaveLength(len);

describe('NorthAmericaRegionalSelect utils', () => {
  describe('"getRegions"', () => {
    it('should return list of states', () =>
      measureLengthOfReturnValue(US, 50));

    it('should return provinces/territories', () =>
      measureLengthOfReturnValue(CA, 13));

    it('should value-label pairs', () =>
      expect(getRegions({ country: CA })[0]).toMatchObject({
        label: expect.any(String),
        value: expect.any(String),
      }));
  });
});
