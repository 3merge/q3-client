import {
  simulateEventHandler,
  getLabelWithFallback,
  valueToLabel,
} from './helpers';

describe('Helpers', () => {
  describe('"simulateEventHandler"', () => {
    it('should call with second parameter', () => {
      const fn = jest.fn();
      simulateEventHandler(fn, 'foo')(null, 'bar');
      expect(fn).toHaveBeenCalledWith({
        target: {
          name: 'foo',
          value: 'bar',
        },
      });
    });

    it('should call with the first parameter', () => {
      const fn = jest.fn();
      simulateEventHandler(
        fn,
        'foo',
      )({ target: { value: 'bar' } });
      expect(fn).toHaveBeenCalledWith({
        target: {
          name: 'foo',
          value: 'bar',
        },
      });
    });
  });

  describe('"getLabelWithFallback"', () => {
    it('should return option label', () => {
      expect(
        getLabelWithFallback()({ label: 'foo' }),
      ).toMatch('foo');
    });

    it('should return label label', () => {
      expect(
        getLabelWithFallback({
          label: 'foo',
          value: 'bar',
        })('bar'),
      ).toMatch('foo');
    });

    it('should return plain option', () => {
      expect(
        getLabelWithFallback({
          label: 'foo',
          value: 'quuz',
        })('bar'),
      ).toMatch('bar');
    });
  });

  describe('"valueToLabel"', () => {
    const items = [
      { value: 1, label: 'john' },
      { value: 2, label: 'doe' },
      { value: 'foo', label: 'foo-label' },
    ];

    it.only('should transform array of values to array of labels', () => {
      expect(valueToLabel(items, ['2', 'foo'])).toEqual([
        'doe',
        'foo-label',
      ]);
    });
  });
});
