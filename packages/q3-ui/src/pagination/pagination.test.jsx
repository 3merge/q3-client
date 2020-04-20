import React from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Pagination from './pagination';

describe('Pagination', () => {
  it('should render previous', () => {
    const el = global.shallow(
      <Pagination
        onPrev={jest.fn()}
        prevDescription="Foo"
      />,
    );

    expect(el.find(KeyboardArrowLeft)).toHaveLength(1);
    expect(el.find(KeyboardArrowRight)).toHaveLength(0);
  });

  it('should render next', () => {
    const el = global.shallow(
      <Pagination
        onNext={jest.fn()}
        nextDescription="Foo"
      />,
    );

    expect(el.find(KeyboardArrowLeft)).toHaveLength(0);
    expect(el.find(KeyboardArrowRight)).toHaveLength(1);
  });
});
