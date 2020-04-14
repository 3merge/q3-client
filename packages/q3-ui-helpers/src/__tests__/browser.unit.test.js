import {
  isDefined,
  proxyLocalStorageApi,
} from '../browser';

describe('Browser', () => {
  describe('"isDefined"', () => {
    it('should return truthy', () => {
      expect(isDefined(1)).toBeTruthy();
    });

    it('should return falsy', () => {
      [undefined, null, 'undefined', 'null'].every((v) =>
        expect(isDefined(v)).toBeFalsy(),
      );
    });
  });

  describe('"proxyLocalStorageApi"', () => {
    it('should call local storage method', () => {
      proxyLocalStorageApi('getItem', 1);
      expect(localStorage.getItem).toHaveBeenCalledWith(1);
    });
  });
});
