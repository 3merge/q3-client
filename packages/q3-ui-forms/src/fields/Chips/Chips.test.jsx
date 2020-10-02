import {
  checkCurrentState,
  getValueEntry,
  matchFreeSoloWithOptions,
} from './Chips';

const valueStub = 'Foo';
const objStub = {
  value: valueStub,
};

describe('Chips', () => {
  describe('"getValueLabel"', () => {
    it('should return value', () =>
      expect(getValueEntry(objStub)).toMatch(valueStub));

    it('should return self', () =>
      expect(getValueEntry(valueStub)).toMatch(valueStub));
  });

  describe('"checkCurrentState"', () => {
    describe('"getSelectedOptions"', () => {
      test.each([
        [objStub, objStub],
        [valueStub, objStub],
      ])('should match option to value', (a, b) => {
        expect(
          checkCurrentState([a]).getSelectedOptions(b),
        ).toBeTruthy();
      });
    });

    describe('"getTags"', () => {
      it('should return tag values', () => {
        const out = checkCurrentState([
          'Retain',
          { label: 'Extract', value: 'e' },
          { value: 'm' },
          undefined,
        ]).getTags([
          {
            label: 'Match',
            value: 'm',
          },
        ]);

        expect(out).toEqual(['Retain', 'Extract', 'Match']);
      });
    });
  });

  describe('"matchFreeSoloWithOptions"', () => {
    it('should deduplicate', () => {
      const onChange = jest.fn();
      matchFreeSoloWithOptions(
        [
          {
            label: 'Three',
            value: '3',
          },
        ],
        onChange,
      )({}, [
        { label: 'One', value: '1' },
        'Two',
        'Two',
        '3',
      ]);

      expect(onChange).toHaveBeenCalledWith({}, [
        { label: 'One', value: '1' },
        { label: 'Two', value: 'Two' },
        { label: 'Three', value: '3' },
      ]);
    });
  });
});
