import React from 'react';
import CodeMirror from 'codemirror/lib/codemirror';
import useCodeMirror from './useCodeMirror';

jest.mock('@material-ui/core', () => ({
  debounce: jest
    .fn()
    .mockImplementation((fn) => () => fn()),
  useTheme: jest.fn(),
}));

beforeEach(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest
    .spyOn(React, 'useLayoutEffect')
    .mockImplementation((fn) => fn());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {},
  });

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([false, jest.fn()]);
});

describe('useCodeMirror', () => {
  it('should call with current value', () => {
    const getValue = jest.fn();
    const setValue = jest.fn();
    const on = jest.fn();
    const onSave = jest.fn();

    jest.spyOn(CodeMirror, 'fromTextArea').mockReturnValue({
      getValue,
      setValue,
      on,
    });

    jest.spyOn(React, 'useContext').mockReturnValue({
      onSave,
    });

    useCodeMirror().save();
    expect(onSave).toHaveBeenCalled();
    expect(getValue).toHaveBeenCalled();
    expect(on).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    expect(setValue).not.toHaveBeenCalled();
  });

  it('should set value', () => {
    const setValue = jest.fn();
    const on = jest.fn();

    jest.spyOn(CodeMirror, 'fromTextArea').mockReturnValue({
      setValue,
      on,
    });

    jest.spyOn(React, 'useContext').mockReturnValue({
      disablePreview: true,
      value: '<p>Testing</p>',
    });

    useCodeMirror();
    expect(on).not.toHaveBeenCalled();
    expect(setValue).toHaveBeenCalled();
  });
});
