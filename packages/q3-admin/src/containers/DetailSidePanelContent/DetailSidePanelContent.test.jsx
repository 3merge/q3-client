import React from 'react';
import Comparisons from 'comparisons';
import { makeSidePanelContent } from './helpers';

jest.mock('comparisons', () => {
  const mock = jest.fn();

  class Test {
    // eslint-disable-next-line
    eval() {
      mock();
      return true;
    }
  }

  Test.mock = mock;
  return Test;
});

const stub = { foo: 1 };
const sharedParams = [stub, { fn: jest.fn() }, jest.fn()];

describe('DetailSidePanelContent', () => {
  describe('"makeSidePanelContent"', () => {
    it('should return empty without data', () => {
      expect(makeSidePanelContent([], {})).toEqual([]);
    });

    it('should invoke fn', () => {
      const mock = jest.fn();

      makeSidePanelContent(mock, ...sharedParams);

      expect(mock).toHaveBeenCalledWith(
        stub,
        expect.any(Object),
        expect.any(Function),
      );
    });

    it('should reduce first parameter', () => {
      const spy = jest
        .spyOn(React, 'createElement')
        .mockReturnValue({});

      makeSidePanelContent(
        [
          {
            title: 'foo',
            component: 1,
            conditions: ['foo=1'],
          },
        ],
        ...sharedParams,
      );

      expect(Comparisons.mock).toHaveBeenCalled();

      expect(spy).toHaveBeenCalledWith(1, {
        data: stub,
        dispatchers: expect.any(Object),
        t: expect.any(Function),
      });
    });
  });
});
