import { navigate } from '@reach/router';
import {
  isDefined,
  proxyLocalStorageApi,
  redirectIn,
} from '../browser';

jest.useFakeTimers();

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

beforeEach(() => {
  navigate.mockReset();
});

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

  describe('"redirectIn"', () => {
    it('should redirect to root', () => {
      redirectIn();
      jest.runAllTimers();
      expect(navigate).toHaveBeenCalledWith('/');
    });

    it('should redirect anywhere', () => {
      redirectIn('/foo');
      jest.advanceTimersByTime(2000);
      expect(navigate).toHaveBeenCalledWith('/foo');
    });

    it('should not redirect until interval finishes', () => {
      redirectIn('/foo', 5000);
      jest.advanceTimersByTime(2000);
      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
