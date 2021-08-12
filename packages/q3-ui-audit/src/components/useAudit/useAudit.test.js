import {
  INCREMENT_SKIP,
  UPDATE_DATA,
  reducerDispatcher,
} from './useAudit';

describe('useAudit', () => {
  describe('reducerDispatcher', () => {
    it('should increase skip', () => {
      const { skip } = reducerDispatcher(
        { skip: 1 },
        { action: INCREMENT_SKIP },
      );

      expect(skip).toBe(2);
    });

    it('should set skip', () => {
      const { skip } = reducerDispatcher(
        { skip: undefined },
        { action: INCREMENT_SKIP },
      );

      expect(skip).toBe(1);
    });

    it('should replace data', () => {
      const state = reducerDispatcher(
        {},
        { action: UPDATE_DATA, data: [1, 2] },
      );

      expect(state).toMatchObject({
        loading: false,
        error: false,
        hasMore: false,
        data: [1, 2],
      });
    });

    it('should add to data', () => {
      const state = reducerDispatcher(
        { data: [1, 2], skip: 1 },
        { action: UPDATE_DATA, data: [3, 4] },
      );

      expect(state).toMatchObject({
        loading: false,
        error: false,
        hasMore: false,
        data: [1, 2, 3, 4],
      });
    });
  });
});
