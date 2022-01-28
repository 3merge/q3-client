import {
  handleSubmit,
  matchAgainstUppercase,
} from './helpers';

describe('"handleSubmit"', () => {
  it('should call second param on success', (done) => {
    const callback = jest.fn();
    handleSubmit(
      jest.fn().mockResolvedValue(),
      callback,
    )().then(() => {
      expect(callback).toHaveBeenCalled();
      done();
    });
  });

  it('should not call second param on error', () => {
    const callback = jest.fn();
    return handleSubmit(
      jest.fn().mockRejectedValue(),
      callback,
    )().catch(() => {
      expect(callback).not.toHaveBeenCalled();
    });
  });
});

test.each([
  ['phrase', true],
  [1, false],
  [undefined, false],
  [null, false],
])('.matchAgainstUppercase(%s)', (a, expected) =>
  expect(matchAgainstUppercase('phrase')(a)).toBe(expected),
);
