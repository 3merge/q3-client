import {
  useEffectMock,
  useLayoutEffectMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { browser } from 'q3-ui-helpers';
import useBrowserEffect from './useBrowserEffect';

const spy = jest.spyOn(browser, 'isBrowserReady');

describe('useBrowserEffect', () => {
  it('should invoke useEffect', () => {
    const { spy: effectMock } = useEffectMock();
    const callback = jest.fn();
    spy.mockReturnValue(true);
    useBrowserEffect(callback, [1]);

    expect(effectMock).toHaveBeenCalledWith(
      expect.any(Function),
      [1],
    );

    expect(callback).toHaveBeenCalled();
  });

  it('should invoke useLayoutEffect', () => {
    const callback = jest.fn();
    spy.mockReturnValue(true);
    useLayoutEffectMock();
    useBrowserEffect(callback, [], {
      useLayout: true,
    });

    expect(callback).toHaveBeenCalled();
  });

  it('should not invoke callback in ssr', () => {
    useEffectMock();
    const callback = jest.fn();
    spy.mockReturnValue(false);
    useBrowserEffect(callback, []);
    expect(callback).not.toHaveBeenCalled();
  });
});
