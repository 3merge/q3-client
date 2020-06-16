import {
  getValues,
  unsetFromPreviousState,
  setInPreviousState,
  reduceErrorMessages,
} from '../useFormContext';

const NEW_KEY = 'testing';
const ERROR_MESSAGE = 'This is required';
const EXPECTED_ARRAY = ['CAD', 'USD'];

describe('useFormContext', () => {
  describe('"getValues"', () => {
    it('should flatten "value" props in the array', () => {
      const out = getValues(
        EXPECTED_ARRAY.map((value) => ({ value })),
      );

      expect(out).toEqual(EXPECTED_ARRAY);
    });

    it('should return unmodified array when simple', () => {
      const out = getValues(EXPECTED_ARRAY);
      expect(out).toEqual(EXPECTED_ARRAY);
    });

    it('should return unmodifed value when not an array', () => {
      const out = getValues(NEW_KEY);
      expect(out).toMatch(NEW_KEY);
    });
  });

  describe('"unsetFromPreviousState"', () => {
    it('should remove from state', () => {
      const out = unsetFromPreviousState(NEW_KEY)({
        [NEW_KEY]: ERROR_MESSAGE,
      });

      expect(out).not.toHaveProperty(NEW_KEY);
    });
  });

  describe('"setInPreviousState"', () => {
    it('should use the error message', () => {
      const out = setInPreviousState(NEW_KEY, {
        message: ERROR_MESSAGE,
      })({});

      expect(out).toHaveProperty(NEW_KEY, ERROR_MESSAGE);
    });
  });

  describe('"reduceErrorMessages"', () => {
    it('should map error path and message values', () => {
      const out = reduceErrorMessages([
        {
          path: NEW_KEY,
          message: ERROR_MESSAGE,
        },
      ]);

      expect(out).toMatchObject({
        [NEW_KEY]: ERROR_MESSAGE,
      });
    });
  });
});
