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

  it('should not call second param on error', (done) => {
    const callback = jest.fn();
    handleSubmit(
      jest.fn().mockRejectedValue(),
      callback,
    )().then(() => {
      expect(callback).not.toHaveBeenCalled();
      done();
    });
  });
});

test.each([
  ['PHRASE', true],
  ['phrase', false],
  [1, false],
  [undefined, false],
  [null, false],
])('.matchAgainstUppercase(%s)', (a, expected) =>
  expect(matchAgainstUppercase('phrase')(a)).toBe(expected),
);
