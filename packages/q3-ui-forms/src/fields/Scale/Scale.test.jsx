import React from 'react';
import Slider from '@material-ui/core/Slider';
import Scale from './Scale';

jest.mock('../withState', () => (fn) => (props) =>
  fn(props),
);

describe('Scale', () => {
  it('should populate value with default [1,100]', () =>
    expect(
      global
        .shallow(<Scale />)
        .find(Slider)
        .props().value,
    ).toEqual([0, 100]));

  it('should populate with min/max', () =>
    expect(
      global
        .shallow(<Scale min={5} max={120} />)
        .find(Slider)
        .props().value,
    ).toEqual([5, 120]));
});
