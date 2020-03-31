import React from 'react';

import { useDataStore, useViewResolutions } from '../use';

let setState;
let ctx;

beforeEach(() => {
  setState = jest.fn();
  ctx = jest.spyOn(React, 'useContext').mockReturnValue({});

  jest
    .spyOn(React, 'useState')
    .mockImplementation((val) => [val, setState]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('use', () => {
  describe('"useDataStore"', () => {
    it('should return initialize dataStore with an array', () => {
      const out = useDataStore({
        resourceName: 'foos',
        state: { foos: [1, 2] },
      });

      expect(out).toEqual([]);
      expect(setState).toHaveBeenCalledWith([1, 2]);
    });

    it('should return initialize dataStore with an object', () => {
      const out = useDataStore({
        id: 1,
        resourceNameSingular: 'foo',
        state: { foo: { id: 1 } },
      });

      expect(out).toEqual({});
      expect(setState).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe('"useViewResolutions"', () => {
    it('should return qualified keys by comparison', () => {
      const out = useViewResolutions(
        {
          foo: { conditionals: ['num=1'] },
          bar: { conditionals: ['num=2'] },
        },
        {
          num: 1,
        },
      );

      expect(out).toEqual(['bar']);
    });

    it('should return role-based keys', () => {
      ctx.mockReturnValue({
        state: {
          profile: {
            role: 'Admin',
          },
        },
      });

      const out = useViewResolutions(
        {
          foo: { roles: ['Admin'] },
          bar: { roles: ['Manager'] },
        },
        {},
      );

      expect(out).toEqual(['bar']);
    });
  });
});
