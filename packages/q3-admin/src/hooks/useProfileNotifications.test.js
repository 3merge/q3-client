import useProfileNotifications from './useProfileNotifications';
import useNotificationsPreferenceOptions from './useNotificationsPreferenceOptions';
import useProfileForm from './useProfileForm';

jest.mock('./useProfileForm');
jest.mock('./useNotificationsPreferenceOptions');

describe('useProfileNotifications', () => {
  it('should assign form values', () => {
    useNotificationsPreferenceOptions.mockReturnValue([
      'foo',
      'bar',
      'thunk',
    ]);

    useProfileForm.mockReturnValue({
      initialValues: {
        listens: ['foo', 'bar', 'quuz'],
      },
    });

    expect(
      useProfileNotifications().initialValues,
    ).toMatchObject({
      foo: true,
      bar: true,
      thunk: false,
    });
  });

  it('should create listen array', () => {
    const onSubmit = jest.fn();
    useNotificationsPreferenceOptions.mockReturnValue([
      'foo',
      'bar',
      'thunk',
    ]);

    useProfileForm.mockReturnValue({
      initialValues: {
        listens: ['quuz'],
      },
      onSubmit,
    });

    useProfileNotifications().onSubmit({
      foo: false,
      bar: false,
      thunk: 'true',
    });

    expect(onSubmit).toHaveBeenCalledWith({
      listens: ['quuz', 'thunk'],
    });
  });

  it('should segment list by variant', () => {
    const onSubmit = jest.fn();
    useNotificationsPreferenceOptions.mockReturnValue([
      'foo__native',
      'bar__native',
      'thunk__native',
    ]);

    useProfileForm.mockReturnValue({
      initialValues: {
        listens: [
          'foo__native',
          'bar__email',
          'thunk__text',
        ],
      },
      onSubmit,
    });

    const { initialValues, onSubmit: onSubmitHandler } =
      useProfileNotifications('native');

    expect(initialValues).toMatchObject({
      'foo__native': true,
      'bar__native': false,
      'thunk__native': false,
    });

    onSubmitHandler({});
    expect(onSubmit).toHaveBeenCalledWith({
      listens: ['bar__email', 'thunk__text'],
    });
  });
});
