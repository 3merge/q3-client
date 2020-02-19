import React from 'react';
import useContent from '../useContent';

const setState = jest.fn();

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setState]);

jest.spyOn(React, 'useEffect').mockImplementation((fn) => {
  fn();
});

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      data: 1,
    }),
  }),
}));

afterEach(() => {
  setState.mockReset();
});

describe('useContent', () => {
  it('should set loading to false immediately', () => {
    useContent();
    expect(setState).toHaveBeenCalledWith(false);
  });

  it('should resolve axios', (done) => {
    useContent(Promise.resolve({ default: 1 }));
    setTimeout(() => {
      expect(setState).toHaveBeenCalledWith(1);
      expect(setState).toHaveBeenCalledWith(false);
      done();
    });
  });

  it('should catch errors', (done) => {
    useContent(Promise.reject(new Error()));
    setTimeout(() => {
      expect(setState).toHaveBeenCalledWith(
        expect.any(Error),
      );
      expect(setState).toHaveBeenCalledWith(false);
      done();
    });
  });
});
