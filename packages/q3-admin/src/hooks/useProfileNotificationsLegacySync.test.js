import {
  useStateMock,
  useEffectMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import useProfileNotificationsLegacySync from './useProfileNotificationsLegacySync';
import useProfileNotifications from './useProfileNotifications';

jest.mock('./useProfileNotifications');
const { spy } = useStateMock();
useEffectMock();

describe('useProfileNotificationsLegacySync', () => {
  it('should skip update without listens', () => {
    useProfileNotifications.mockReturnValue({
      listens: [],
    });

    useProfileNotificationsLegacySync(['foo']);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should skip update without channels', () => {
    useProfileNotifications.mockReturnValue({
      listens: ['foo', 'bar'],
    });

    useProfileNotificationsLegacySync();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should skip update on already upgraded listen values', () => {
    useProfileNotifications.mockReturnValue({
      listens: ['foo__email', 'bar'],
    });

    useProfileNotificationsLegacySync(['email', 'text']);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should append channels to all', () => {
    const onSubmit = jest.fn().mockResolvedValue(null);
    useProfileNotifications.mockReturnValue({
      listens: ['foo', 'bar', 'quuz', 'thunk'],
      listensOptions: [
        'foo',
        'bar',
        'quuz__text',
        'thunk__native',
        'thunk__email',
      ],
      onSubmit,
    });

    useProfileNotificationsLegacySync([
      'native',
      'email',
      'text',
    ]);

    expect(onSubmit).toHaveBeenCalledWith({
      foo__native: true,
      foo__email: true,
      foo__text: true,
      bar__native: true,
      bar__email: true,
      bar__text: true,
      quuz__text: true,
      thunk__native: true,
      thunk__email: true,
    });
  });
});
