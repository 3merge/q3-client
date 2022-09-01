// eslint-disable-next-line
import { browser } from 'q3-ui-helpers';

const localStorageUtils = () => {
  const spy = jest
    .spyOn(browser, 'proxyLocalStorageApi')
    .mockReturnValue(undefined);

  return {
    changeReturnValue(returnValue = null) {
      spy.mockReturnValue(returnValue);
    },

    hasGotten(expectedStorageKey) {
      expect(spy).toHaveBeenCalledWith(
        'getItem',
        expectedStorageKey,
      );
    },

    hasSet(expectedStorageKey, expectedStorageValue) {
      expect(spy).toHaveBeenCalledWith(
        'setItem',
        expectedStorageKey,
        expectedStorageValue,
      );
    },

    reset() {
      spy.mockClear();
    },
  };
};

export default localStorageUtils;
