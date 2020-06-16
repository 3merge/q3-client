import React from 'react';
import usePrevious from '../usePrevious';

beforeEach(() => {
  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      foo: 1,
      bar: 1,
    },
  });

  jest.spyOn(React, 'useEffect').mockImplementation(() => {
    // noop
  });
});

describe('usePrevious', () => {
  it('should compare states', () => {
    const out = usePrevious({
      foo: 1,
      bar: 2,
    });

    expect(out).toHaveProperty('prev');
    expect(out).toHaveProperty('isModified', true);
  });

  it('should compare states', () => {
    const out = usePrevious({
      foo: 1,
      bar: 1,
    });

    expect(out).toHaveProperty('prev');
    expect(out).toHaveProperty('isModified', false);
  });
});
