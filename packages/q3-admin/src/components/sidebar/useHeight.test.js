import {
  getClientHeight,
  getHeaderHeight,
  getProfileBarHeight,
  calculateHeight,
} from './useHeight';

let spy;

beforeEach(() => {
  spy = jest.spyOn(document, 'querySelector');
  jest.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: jest.fn().mockReturnValue({
      replace: jest.fn().mockReturnValue(5),
    }),
  });
});

describe('useHeight', () => {
  describe('"getClientHeight"', () => {
    it('should return 0 by default', () => {
      expect(getClientHeight(null)).toBe(0);
    });

    it('should return value of clientHeight prop', () => {
      expect(getClientHeight({ clientHeight: 150 })).toBe(
        150,
      );
    });
  });

  describe('"getHeaderHeight"', () => {
    it('should return 0', () => {
      spy.mockReturnValue(null);
      expect(getHeaderHeight()).toBe(0);
    });

    it('should return header height', () => {
      spy.mockReturnValue({ clientHeight: 5 });
      expect(getHeaderHeight()).toBe(5);
    });
  });

  describe('"getProfileBarHeight"', () => {
    it('should return 0 if under certain amount', () => {
      spy.mockReturnValue({ clientHeight: 150 });
      expect(getProfileBarHeight()).toBe(150);
    });

    it('should return header height', () => {
      spy.mockReturnValue({ clientHeight: 300 });
      expect(getProfileBarHeight()).toBe(0);
    });
  });

  describe('"calculateHeight"', () => {
    it('should return total of profile, header and offset', () => {
      spy.mockReturnValue({ clientHeight: 10 });
      const next = jest.fn();
      calculateHeight(next, true)();
      // refer to mock above
      expect(next).toHaveBeenCalledWith(
        'calc(100vh - 25px)',
      );
    });
  });
});
