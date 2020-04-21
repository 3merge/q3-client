import React from 'react';
import 'jest-localstorage-mock';

import {
  useDataStore,
  useViewResolutions,
  useReferrer,
  useRootPath,
} from '../use';

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

  describe('"useReferrer"', () => {
    const query = '/foos?query=rememeber-me';

    it('should return resourceName by default', () => {
      const out = useReferrer().getPath();
      expect(out).toMatch('/');
    });

    it('should return resourceName if localStorage belongs to a different collection', () => {
      sessionStorage.getItem.mockReturnValue(query);
      const out = useReferrer('bars').getPath();
      expect(out).toMatch('bars');
    });

    it('should return localStorage value', () => {
      sessionStorage.getItem.mockReturnValue(query);
      const out = useReferrer('foos').getPath();
      expect(out).toMatch(query);
    });

    it('should set new referrer', () => {
      useReferrer('foos').setPath(query);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        query,
      );
    });
  });

  describe('"useRootPath"', () => {
    it('should retain location root', () => {
      useRootPath({ pathname: '/app/foo/1' }, '1');
      expect(setState).toHaveBeenCalledWith('/app/foo/1');
    });

    it('should strip off sub paths', () => {
      useRootPath({ pathname: '/app/foo/1/trash' }, '1');
      expect(setState).toHaveBeenCalledWith('/app/foo/1');
    });
  });
});
