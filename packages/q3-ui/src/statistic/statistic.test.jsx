import React from 'react';
import { getIcon, Difference } from '.';

describe('Statistic', () => {
  describe('getIcon', () => {
    it('should return TrendingUp with positive number', () =>
      expect(getIcon(1)).toHaveProperty(
        'displayName',
        'TrendingUpIcon',
      ));

    it('should return TrendingFlat with 0', () =>
      expect(getIcon(0)).toHaveProperty(
        'displayName',
        'TrendingFlatIcon',
      ));

    it('should return TrendingDown with negative number', () =>
      expect(getIcon(-2)).toHaveProperty(
        'displayName',
        'TrendingDownIcon',
      ));
  });

  describe('Difference', () => {
    it('should write out the value percentage', () =>
      expect(
        global.shallow(<Difference value={12} />).text(),
      ).toMatch('12%'));
  });
});
