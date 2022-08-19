import React from 'react';
import MenuSystemRailed, {
  getActiveParent,
} from './MenuSystemRailed';

describe('MenuSystemRailed', () => {
  describe('getActiveParent', () => {
    it('should return active item', () => {
      expect(
        getActiveParent([
          { label: 'foo' },
          { label: 'bar', active: true },
          { label: 'quuz' },
        ]),
      ).toMatchObject({
        label: 'bar',
      });
    });

    it('should return first item', () => {
      expect(
        getActiveParent([
          { label: 'foo' },
          { label: 'bar' },
          { label: 'quuz' },
        ]),
      ).toMatchObject({
        label: 'foo',
      });
    });
  });
});
