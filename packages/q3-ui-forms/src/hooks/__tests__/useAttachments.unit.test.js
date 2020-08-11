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

let useContext;

beforeEach(() => {
  useContext = jest.spyOn(React, 'useContext');
  jest
    .spyOn(React, 'useCallback')
    .mockReturnValue((fn) => (args) => fn(args));
});

describe('useAttachments', () => {
  describe('hook', () => {
    it('should clear file reference', () => {
      useContext.mockReturnValue({
        setFieldValue: jest.fn(),
        setFieldError: jest.fn(),
      });

      useDropzone.mockReturnValue({
        getRootProps: jest.fn(),
        getInputProps: jest.fn(),
        inputRef: {
          current: null,
        },
      });

      useAttachments(name);
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
