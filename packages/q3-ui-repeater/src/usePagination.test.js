import { slicer } from './usePagination';

test.each([
  [1, 1, [1]],
  [3, 3, [7, 8, 9]],
  [4, 3, [10]],
  [5, 2, [9, 10]],
  [100, 100, []],
])('should return correct list', (cur, per, result) => {
  expect(
    slicer(cur, per, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ).toEqual(result);
});
