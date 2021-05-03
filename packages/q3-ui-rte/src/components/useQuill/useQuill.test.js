import React from 'react';
import useQuill from './useQuill';

const makeRef = () => {
  const ref = { current: null };
  jest.spyOn(React, 'useRef').mockImplementation(() => {
    return ref;
  });

  return ref;
};

jest.mock('quill', () => {
  class QuillMock {
    constructor() {
      this.focus = jest.fn();
    }

    static import() {
      return this;
    }

    static register() {
      return this;
    }
  }

  return QuillMock;
});

beforeAll(() => {
  jest
    .spyOn(React, 'useLayoutEffect')
    .mockImplementation((callback) => callback());
});

describe('useQuill', () => {
  it('should invoke autofocus', () => {
    const ref = makeRef();
    useQuill({ autofocus: true });
    expect(ref.current.focus).toHaveBeenCalled();
  });

  it('should not invoke autofocus', () => {
    const ref = makeRef();
    useQuill({ autofocus: false });
    expect(ref.current.focus).not.toHaveBeenCalled();
  });
});
