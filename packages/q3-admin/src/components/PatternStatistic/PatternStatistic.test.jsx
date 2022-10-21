import React from 'react';
import { PatternStatistic } from './PatternStatistic';
import Pattern from '../Pattern';
import useReportById from '../../hooks/useReportById';

jest.mock('../../hooks/useReportById', () => jest.fn());

describe('PatternStatistic', () => {
  it('should render inside positive class', () => {
    useReportById.mockReturnValue({
      data: [
        {
          unit: 'percent',
          deviation: 10,
          value: 23.7,
          label: 'growth',
        },
      ],
    });

    const pattern = global
      .shallow(<PatternStatistic report="test" />)
      .find(Pattern);

    expect(pattern.find('.stat').text()).toBe('24%');
    expect(pattern.find('.positive').text()).toBe(
      '10% change',
    );
  });

  it('should render inside negative class', () => {
    useReportById.mockReturnValue({
      data: [
        {
          unit: 'dollar',
          deviation: -22,
          value: 399234,
          label: 'growth',
        },
      ],
    });

    const pattern = global
      .shallow(<PatternStatistic report="test" />)
      .find(Pattern);

    expect(pattern.find('.stat').text()).toBe(
      '$399,234.00',
    );
    expect(pattern.find('.negative').text()).toBe(
      '-22% change',
    );
  });

  it('should render inside hidden class', () => {
    useReportById.mockReturnValue({
      data: [
        {
          unit: 'month',
          value: 399234,
          label: 'growth',
        },
      ],
    });

    const pattern = global
      .shallow(<PatternStatistic report="test" />)
      .find(Pattern);

    expect(pattern.find('.stat').text()).toBe(
      '399,234 month',
    );
    expect(pattern.find('.hidden').length).toBe(1);
  });
});
