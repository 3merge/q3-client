import React from 'react';
import * as helpers from '..';

beforeAll(() => {
  jest
    .spyOn(React.Children, 'toArray')
    .mockImplementation((v) => v);
});

describe('Form helpers', () => {
  describe('asOptions', () => {
    it('should convert simple array into multi-dimensional', () =>
      expect(helpers.asOptions(['foo'])).toEqual([
        { value: 'foo', label: 'foo' },
      ]));
  });

  describe('isArray', () => {
    it('should return truthy', () =>
      expect(helpers.isArray(['foo'])).toBeTruthy());

    it('should return falsy', () =>
      expect(helpers.isArray([])).toBeFalsy());
  });

  describe('condense', () => {
    it('should flatten and filter out nullish values', () =>
      expect(
        helpers.condense(['foo', ['bar', null], undefined]),
      ).toEqual(['foo', 'bar']));
  });

  describe('isObject', () => {
    it('should return truthy', () =>
      expect(helpers.isObject({ key: 1 })).toBeTruthy());

    it('should return falsy', () =>
      expect(helpers.isObject([])).toBeFalsy());
  });

  describe('assignIDs', () => {
    it('should map index to key', () =>
      expect(
        helpers.assignIDs([{ value: 1 }, { value: 2 }]),
      ).toEqual([
        { id: 0, value: 1 },
        { id: 1, value: 2 },
      ]));

    it('should preserve id', () =>
      expect(
        helpers.assignIDs([
          { value: 1, id: 12 },
          { value: 2 },
        ]),
      ).toEqual([
        { id: 12, value: 1 },
        { id: 1, value: 2 },
      ]));

    it('should use prop as map guide', () =>
      expect(
        helpers.assignIDs(
          [{ value: 1, id: 12 }, { value: 2 }],
          'value',
        ),
      ).toEqual([
        { id: 1, value: 1 },
        { id: 2, value: 2 },
      ]));
  });

  describe('getFieldNames', () => {
    it('should return an array of "named" components', () => {
      const target = 'foo';
      const input = [
        {
          type: { name: target },
          props: { children: [], name: 'fieldA' },
        },
        {
          type: { name: target },
          props: { children: [], name: 'fieldB' },
        },
        {
          type: { name: '' },
          props: { children: [], name: 'fieldC' },
        },
      ];

      const out = helpers.getFieldNames(input, target);
      expect(out).toHaveLength(2);
    });
  });

  describe('intersects', () => {
    it('should return truthy on match', () =>
      expect(
        helpers.intersects(
          ['a', 'b', 'c'],
          ['e', 'f', 'c'],
        ),
      ).toBeTruthy());

    it('should return falsy without a match', () =>
      expect(
        helpers.intersects(
          ['a', 'b', 'c'],
          ['e', 'f', 'g'],
        ),
      ).toBeFalsy());
  });

  describe('"isReady"', () => {
    it('should return truthy', () => {
      expect(
        helpers.isReady({ status: 'Ready' }),
      ).toBeTruthy();
    });

    it('should return falsy', () => {
      expect(
        helpers.isReady({ status: 'Initializing' }),
      ).toBeFalsy();
    });
  });

  describe('"delayPromise"', () => {
    it('should invoke promise', (done) => {
      const next = jest.fn().mockImplementation(() => {
        expect(next).toHaveBeenCalled();
        done();
      });

      helpers.delayPromise(Promise.resolve, null, next);
    });
  });
});
