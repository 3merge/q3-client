import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '.';

const getProps = (args) => ({
  isFirst: false,
  isLast: false,
  next: jest.fn(),
  back: jest.fn(),
  ...args,
});

const renderPagination = (props) =>
  global
    .shallow(<Pagination {...props} />)
    .find(IconButton);

describe('"Slider/Pagination"', () => {
  it('should render the click handlers', () => {
    const props = getProps();
    const buttons = renderPagination(props);

    buttons
      .first()
      .props()
      .onClick();

    buttons
      .last()
      .props()
      .onClick();

    expect(buttons).toHaveLength(2);
    expect(props.back).toHaveBeenCalled();
    expect(props.next).toHaveBeenCalled();
  });

  it('should disable the first IconButton', () =>
    expect(
      renderPagination(getProps({ isFirst: true }))
        .first()
        .props(),
    ).toHaveProperty('disabled', true));

  it('should disable the last IconButton', () =>
    expect(
      renderPagination(getProps({ isLast: true }))
        .last()
        .props(),
    ).toHaveProperty('disabled', true));
});
