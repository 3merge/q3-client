import useNotificationsPreferenceOptions from './useNotificationsPreferenceOptions';
import useDomainContext from './useDomainContext';
import useRole from './useRole';

jest.mock('./useDomainContext');
jest.mock('./useRole');

describe('useProfileNotifications', () => {
  it('should map domain listens to user role', () => {
    useRole.mockReturnValue({
      role: 'Developer',
    });

    useDomainContext.mockReturnValue({
      domain: {
        listens: {
          Developer: ['foo', 'bar'],
        },
      },
    });

    expect(useNotificationsPreferenceOptions()).toEqual([
      'foo',
      'bar',
    ]);
  });

  it('should append variant and discard variant-specific options', () => {
    useRole.mockReturnValue({
      role: 'Developer',
    });

    useDomainContext.mockReturnValue({
      domain: {
        listens: {
          Developer: [
            'foo',
            'bar',
            'quuz__mobile',
            'thunk__test',
          ],
        },
      },
    });

    expect(
      useNotificationsPreferenceOptions('test'),
    ).toEqual(['foo__test', 'bar__test', 'thunk__test']);
  });
});
