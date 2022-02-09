import { useAuth } from 'q3-ui-permissions';
import useDomainAuth from './useDomainAuth';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

describe('useDomainAuth', () => {
  it('should return false if all options are false', () => {
    useAuth.mockReturnValue({});
    expect(useDomainAuth()).toBeFalsy();
  });

  it('should return true if just one option is trrue', () => {
    useAuth.mockReturnValue({
      canCreate: false,
      canSee: true,
    });

    expect(useDomainAuth()).toBeTruthy();
  });
});
