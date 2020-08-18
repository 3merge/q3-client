import React from 'react';
import { useDropzone } from 'react-dropzone';
import useAttachments, {
  cleanDropzoneInputProps,
  getDropzoneRejectedMessages,
  setNextState,
} from '../useAttachments';

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

const name = 'ATTACHMENT_TEST';

const appendMock = (target, key) =>
  Object.assign(target, {
    [key]: jest.fn(),
  });

const stubContext = (mock) => {
  jest.spyOn(React, 'useContext').mockReturnValue(mock);
  return mock;
};

const genContextMocks = () => {
  const mocks = [
    'prevStateHandler',
    'setAttachments',
    'setFieldError',
    'setFieldValue',
  ].reduce(appendMock, {});

  mocks.setAttachments = jest
    .fn()
    .mockImplementation((fn) => {
      mocks.prevStateHandler(
        fn({
          [name]: 1,
        }),
      );
    });

  return stubContext({
    ...mocks,
    inputRef: {
      current: {
        value: 1,
      },
    },
  });
};

const genDropzoneMocks = (current = null) => ({
  getRootProps: jest.fn(),
  getInputProps: jest.fn(),
  inputRef: {
    current,
  },
});

beforeEach(() => {
  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => (...args) => fn(...args));
});

describe('useAttachments', () => {
  describe('hook', () => {
    it('should clear file reference', () => {
      const stopPropagation = jest.fn();

      const {
        inputRef,
        setFieldError,
        prevStateHandler,
      } = genContextMocks();

      useDropzone.mockReturnValue({
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        inputRef,
      });

      useAttachments(name).onClear({
        stopPropagation,
      });

      expect(stopPropagation).toHaveBeenCalled();
      expect(inputRef.current.value).toBeNull();
      expect(prevStateHandler).toHaveBeenCalledWith({});
      expect(setFieldError).toHaveBeenCalledWith(
        name,
        null,
      );
    });

    it('should add file to state', () => {
      const { prevStateHandler } = genContextMocks();

      useDropzone.mockImplementation(({ onDrop }) => {
        onDrop([{ name: 'foo.csv' }], []);
        return genDropzoneMocks();
      });

      useAttachments(name);
      expect(prevStateHandler).toHaveBeenCalledWith({
        [name]: {
          $locals: {},
          name: 'foo.csv',
        },
      });
    });

    it('should add error to state', () => {
      const { setFieldError } = genContextMocks();
      const message = 'Whoops';

      useDropzone.mockImplementation(({ onDrop }) => {
        onDrop(
          [],
          [
            {
              errors: [
                {
                  message,
                },
              ],
            },
          ],
        );

        return genDropzoneMocks();
      });

      useAttachments(name);
      expect(setFieldError).toHaveBeenCalledWith(
        name,
        message,
      );
    });
  });

  it('should clean dropzone props', () =>
    expect(
      cleanDropzoneInputProps({
        style: {},
      }),
    ).not.toHaveProperty('style'));

  it('should map dropzone error messages', () => {
    const assemble = (a) =>
      a.reduce(
        (acc, message) => {
          acc.errors.push({
            message,
          });

          return acc;
        },
        {
          errors: [],
        },
      );

    expect(
      getDropzoneRejectedMessages(assemble(['a', 'b'])),
    ).toMatch('a, b');
  });

  it('should remove from state without a second parameter', () =>
    expect(
      setNextState(name)({ name: 1 }),
    ).not.toHaveProperty(name));

  it('should replace state with a second parameter', () =>
    expect(
      setNextState(name, 2)({ name: 1 }),
    ).toHaveProperty(name, 2));
});
