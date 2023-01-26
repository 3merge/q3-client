import { object, browser } from 'q3-ui-helpers';
import {
  parseArray,
  checkLocalStorage,
} from './useNotificationsAnalytics';

let spy;

beforeAll(() => {
  spy = jest.spyOn(browser, 'proxyLocalStorageApi');
});

beforeEach(() => {
  spy.mockReset();
});

describe('useNotificationsAnalytics', () => {
  describe('parseArray', () => {
    it('should return empty', () => {
      expect(parseArray(undefined)).toEqual([]);
      expect(parseArray('testing')).toEqual([]);
      expect(parseArray(JSON.stringify({}))).toEqual([{}]);
    });
  });

  describe('checkLocalStorage', () => {
    it('should push into storage', () => {
      const storage = [{ document: 1 }];
      const item = { document: 2 };

      spy.mockReturnValue(object.toJSON(storage));
      expect(checkLocalStorage(item)).toBeFalsy();

      expect(spy).toHaveBeenCalledWith(
        'getItem',
        expect.any(String),
      );

      expect(spy).toHaveBeenCalledWith(
        'setItem',
        expect.any(String),
        object.toJSON(storage.concat(item)),
      );
    });
    it('should skip storage', () => {
      const storage = [{ document: 1 }, { document: 2 }];
      const item = storage[1];

      spy.mockReturnValue(object.toJSON(storage));
      expect(checkLocalStorage(item)).toBeTruthy();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should replace first in array', () => {
      const storage = [
        { document: 1 },
        { document: 2 },
        { document: 3 },
        { document: 4 },
        { document: 5 },
      ];

      const item = { document: 6 };
      spy.mockReturnValue(object.toJSON(storage));
      expect(checkLocalStorage(item, 4)).toBeFalsy();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(
        'setItem',
        expect.any(String),
        object.toJSON(storage.splice(1, 4).concat(item)),
      );
    });
  });
});
