import {
  orTruthy,
  getInitialStatus,
  STATUS_INITIALIZING,
  STATUS_READY,
} from './utils';

describe('Wrapper utils', () => {
  describe('"orTruthy"', () => {
    it('should return true by default', () => {
      expect(orTruthy()).toBeTruthy();
    });

    it('should return second param', () => {
      expect(orTruthy(false, true)).toBeTruthy();
    });
  });

  describe('"getInitialStatus"', () => {
    it('should return initializing', () => {
      expect(getInitialStatus()).toMatch(
        STATUS_INITIALIZING,
      );
    });

    it('should return ready', () => {
      expect(getInitialStatus(true, null)).toMatch(
        STATUS_READY,
      );
    });

    it('should return initializing', () => {
      const o = 'override';
      expect(getInitialStatus(true, o)).toMatch(o);
    });
  });
});
