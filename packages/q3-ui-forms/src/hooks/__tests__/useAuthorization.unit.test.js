import { useAuth } from 'q3-ui-permissions';
import useAuthentication, {
  orTruthy,
} from '../useAuthorization';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

describe('useAuthentication', () => {
  describe('"orTruthy"', () => {
    it('should return true by default', () => {
      expect(orTruthy()).toBeTruthy();
    });

    it('should return second param', () => {
      expect(orTruthy(false, true)).toBeTruthy();
    });
  });
  describe('"isDisabled"', () => {
    it('should return falsy without a collectionName', () => {
      useAuth.mockReturnValue({});
      expect(useAuthentication().isDisabled()).toBeFalsy();
    });

    it('should return truthy if canEdit is falsy', () => {
      useAuth.mockReturnValue({
        canEdit: true,
        canCreate: false,
      });
      expect(
        useAuthentication('foo', true).isDisabled(),
      ).toBeTruthy();
    });

    it('should return truthy if canCreate is falsy', () => {
      useAuth.mockReturnValue({
        canEdit: false,
        canCreate: true,
      });
      expect(
        useAuthentication('foo', false).isDisabled(),
      ).toBeTruthy();
    });

    it('should return falsy if canEdit is truthy', () => {
      useAuth.mockReturnValue({
        canEdit: true,
        canCreate: true,
      });
      expect(
        useAuthentication('foo', false).isDisabled(),
      ).toBeFalsy();
    });
  });

  describe('"checkReadAuthorizationContext"', () => {
    it('should return truthy', () => {
      useAuth.mockReturnValue({
        canSeeSub: jest.fn().mockReturnValue(true),
      });
      expect(
        useAuthentication(
          'foo',
          false,
        ).checkReadAuthorizationContext(),
      ).toBeTruthy();
    });
  });

  describe('"checkReadAuthorizationContext"', () => {
    it('should return truthy', () => {
      useAuth.mockReturnValue({
        canCreateSub: jest.fn().mockReturnValue(true),
      });
      expect(
        useAuthentication(
          'foo',
          true,
        ).checkEditAuthorizationContext(),
      ).toBeTruthy();
    });
  });
});
