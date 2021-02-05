import { getIcon, getText } from './PollIndicator';

describe('Admin>PollIndicator', () => {
  describe('"getIcon"', () => {
    it('should return Flare icon', () => {
      const el = getIcon({ hasPendingUpdate: true });
      expect(el.type.render.displayName).toMatch('Flare');
    });

    it('should return TrackChanges icon', () => {
      const el = getIcon({ hasChange: true });
      expect(el.type.render.displayName).toMatch('Track');
    });

    it('should return Update icon', () => {
      const el = getIcon();
      expect(el.type.render.displayName).toMatch('Update');
    });
  });

  describe('"getText"', () => {
    it('should return unsavedChanges', () => {
      const text = getText({ hasChange: true });
      expect(text).toMatch('unsavedChanges');
    });

    it('should return pendingUpdate', () => {
      const text = getText({ hasPendingUpdate: true });
      expect(text).toMatch('pendingUpdate');
    });
  });
});
