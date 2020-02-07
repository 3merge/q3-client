import { handleClear } from '..';

describe('FilterForm', () => {
  describe('"handleClear"', () => {
    it('should call remove for undefined values ', () => {
      const remove = jest.fn();
      const done = jest.fn();
      const fn = handleClear({
        values: { foo: { value: undefined } },
        state: { foo: 1 },
        remove,
        done,
      });
      fn();

      expect(remove).toHaveBeenCalledWith('foo');
      expect(done).toHaveBeenCalled();
    });
  });
});
