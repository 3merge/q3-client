import { shuffle } from 'lodash';
import * as utils from './utils';

const coordsAsArray = [
  137, 64, 322, 71, 380, 392, 103, 387,
];

const coordsAsMultiDimensionalArray = [
  [137, 64],
  [322, 71],
  [380, 392],
  [103, 387],
];

const coordsAsArrayOfObjects = [
  {
    x: 137,
    y: 64,
  },
  {
    x: 322,
    y: 71,
  },
  {
    x: 380,
    y: 392,
  },
  {
    x: 103,
    y: 387,
  },
];

describe('docscan utils', () => {
  describe('calculateDistanceOfLineOn2DPlane', () => {
    it('should run appropriate formula and round up', () => {
      expect(
        utils.calculateDistanceOfLineOn2DPlane(
          {
            x: 45,
            y: 55,
          },
          {
            x: 365,
            y: 450,
          },
        ),
      ).toBe(509);
    });
  });

  describe('calculateDimensions', () => {
    it('should report avg height and width of rect', () => {
      [
        coordsAsArray,
        coordsAsMultiDimensionalArray,
        coordsAsArrayOfObjects,
      ].forEach((args) => {
        expect(
          utils.calculateDimensions(args),
        ).toMatchObject({
          height: 326,
          width: 232,
        });
      });
    });
  });

  describe('convertCoordinatesIntoArrayPair', () => {
    it('should explode x-y keys', () => {
      expect(
        utils.convertCoordinatesIntoArrayPair({
          x: 12,
          y: 53,
        }),
      ).toEqual([12, 53]);
    });

    it('should default to 0,0', () => {
      expect(
        utils.convertCoordinatesIntoArrayPair(),
      ).toEqual([0, 0]);
    });
  });

  describe('convertData32SIntoArrayPair', () => {
    it('should assemble into x-y pairs', () => {
      // 8 coords in a rect
      expect(
        utils.convertData32SIntoArrayPair(
          Array.from({
            length: 8,
          }).map((_, idx) => idx),
        ),
      ).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
      ]);
    });
  });

  describe('calculateFourCornersOfRectangle', () => {
    it('should rearrange points regardless their order', () => {
      [
        coordsAsMultiDimensionalArray,
        coordsAsArrayOfObjects,
      ]
        // knock them out of order
        .map(shuffle)
        .forEach((args) => {
          expect(
            utils.calculateFourCornersOfRectangle(args),
          ).toEqual(coordsAsArrayOfObjects);
        });
    });
  });

  describe('isApproximatelyTheLargestRectangle', () => {
    it('should return previous', () => {
      expect(
        utils.isApproximatelyTheLargestRectangle(
          {
            foo: 2,
            rows: 4,
            size: 1000,
          },
          {
            foo: 1,
            rows: 4,
            size: 5000,
          },

          (x) => x.size,
        ),
      ).toBeFalsy();
    });

    it('should return current', () => {
      expect(
        utils.isApproximatelyTheLargestRectangle(
          {
            foo: 2,
            rows: 4,
            size: 5000,
          },
          {
            foo: 1,
            rows: 4,
            size: 1000,
          },

          (x) => x.size,
        ),
      ).toBeTruthy();
    });

    it('should match on four rows', () => {
      expect(
        utils.isApproximatelyTheLargestRectangle(
          {
            foo: 2,
            rows: 4,
            size: 5000,
          },
          {
            foo: 1,
            rows: 3,
            size: 10000,
          },
          (x) => x.size,
        ),
      ).toBeTruthy();
    });
  });
});
