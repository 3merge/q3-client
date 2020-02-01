import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Steps from './steps';
import Pagination from './pagination';
import Slider from '.';

jest.mock('./useStyle', () => () => ({
  root: null,
}));

describe('Slider pagination', () => {
  it('should render without buttons', () => {
    expect(
      global.mount(<Slider slides={[]} />).find(IconButton),
    ).toHaveLength(0);
  });

  it('should render with only buttons', () => {
    const wrap = global.mount(
      <Slider withButtons slides={[]} />,
    );
    expect(wrap.find(Pagination)).toHaveLength(1);
    expect(wrap.find(Steps)).toHaveLength(0);
  });

  it('should render with steppers', () => {
    const wrap = global.mount(
      <Slider withSteppers slides={[]} />,
    );
    expect(wrap.find(Pagination)).toHaveLength(0);
    expect(wrap.find(Steps)).toHaveLength(1);
  });
});
