import { useEffectMock } from 'q3-ui-test-utils/lib/reactUtils';
import { useToggle } from 'useful-state';
import useToggleEffect from './useToggleEffect';

jest.mock('useful-state');
useEffectMock();

describe('useEffectMock', () => {
  it('should close', () => {
    const close = jest.fn();
    useToggle.mockReturnValue({
      close,
    });

    useToggleEffect(false);
    expect(close).toHaveBeenCalled();
  });

  it('should open', () => {
    const open = jest.fn();
    useToggle.mockReturnValue({
      open,
    });

    useToggleEffect(true);
    expect(open).toHaveBeenCalled();
  });
});
