import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Slider, { PaginationButtons } from '.';

jest.mock('react-id-swiper/lib/styles/css/swiper.css');

describe('Slider pagination', () => {
  test('should render without buttons', () => {
    expect(
      global.mount(<Slider slides={[]} />).find(IconButton),
    ).toHaveLength(0);
  });

  test('should render with only buttons', () => {
    const wrap = global.mount(
      <Slider withButtons slides={[]} />,
    );
    expect(wrap.find(IconButton)).toHaveLength(2);
    expect(wrap.find(MobileStepper)).toHaveLength(0);
  });

  test('should render with steppers', () => {
    const wrap = global.mount(
      <Slider withButtons withSteppers slides={[]} />,
    );
    expect(wrap.find(IconButton)).toHaveLength(0);
    expect(wrap.find(MobileStepper)).toHaveLength(1);
    expect(wrap.find(Button)).toHaveLength(2);
  });
});

describe('PaginationButtons', () => {
  it('should disable previous button', () => {
    const wrap = global.shallow(
      <PaginationButtons
        isFirst
        isLast={false}
        next={jest.fn()}
        back={jest.fn()}
      />,
    );
    expect(
      wrap
        .find(IconButton)
        .first()
        .props(),
    ).toHaveProperty('disabled', true);
  });

  it('should not disable last button', () => {
    const wrap = global.shallow(
      <PaginationButtons
        isLast={false}
        isFirst={false}
        next={jest.fn()}
        back={jest.fn()}
      />,
    );
    expect(
      wrap
        .find(IconButton)
        .last()
        .props(),
    ).toHaveProperty('disabled', false);
  });
});
