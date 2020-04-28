import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  FilterConfig,
  removeUncontrollableFilterProps,
  countParams,
} from './filter';

describe('Filter', () => {
  it('should count parameters by ampersand', () => {
    const p = countParams({
      toString: jest.fn().mockReturnValue('foo=1&bar=2'),
    });

    expect(p).toBe(2);
  });

  it('should return 0 by default', () => {
    const p = countParams();
    expect(p).toBe(0);
  });

  it('should remove automated query params', () => {
    const deleteOne = jest.fn();
    removeUncontrollableFilterProps({ delete: deleteOne });
    expect(deleteOne).toHaveBeenCalledWith('page');
    expect(deleteOne).toHaveBeenCalledWith('limit');
    expect(deleteOne).toHaveBeenCalledWith('search');
  });

  it('should render nothing without at least  renderFilter', () => {
    const el = global
      .shallow(
        <FilterConfig params={{ delete: jest.fn() }} />,
      )
      .find(Tabs);

    expect(el).toHaveLength(0);
  });

  it('should disable unused features', () => {
    const el = global
      .shallow(
        <FilterConfig
          params={{ delete: jest.fn() }}
          renderFilter={jest.fn()}
        />,
      )
      .find(Tabs)
      .dive()
      .find(Tab);

    const isDisabled = (v) =>
      expect(el.at(v).props()).toHaveProperty(
        'disabled',
        true,
      );

    expect(el).toHaveLength(2);
    isDisabled(1);
  });
});
