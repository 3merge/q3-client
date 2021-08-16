import React from 'react';
import Button from '@material-ui/core/Button';
import LoadMore from './LoadMore';

describe('LoadMore', () => {
  it('should be disabled while loading', () => {
    const el = global
      .shallow(
        <LoadMore
          data={[{}]}
          getMore={jest.fn()}
          loading
        />,
      )
      .find(Button);

    expect(el.prop('disabled')).toBeTruthy();
    expect(el.text()).toMatch('isLoading');
  });

  it('should be disabled without more results', () => {
    const el = global
      .shallow(
        <LoadMore
          data={[{}]}
          getMore={jest.fn()}
          hasMore={false}
        />,
      )
      .find(Button);

    expect(el.prop('disabled')).toBeTruthy();
    expect(el.text()).toMatch('loadMore');
  });

  it('should not render on error', () => {
    expect(
      global
        .shallow(
          <LoadMore
            data={[{}]}
            getMore={jest.fn()}
            error
          />,
        )
        .find(Button)
        .exists(),
    ).toBeFalsy();
  });

  it('should not render on empty', () => {
    expect(
      global
        .shallow(<LoadMore data={[]} getMore={jest.fn()} />)
        .find(Button)
        .exists(),
    ).toBeFalsy();
  });

  it('should fire click handler', () => {
    const getMore = jest.fn();

    global
      .shallow(
        <LoadMore data={[{}]} getMore={getMore} hasMore />,
      )
      .find(Button)
      .props()
      .onClick();

    expect(getMore).toHaveBeenCalled();
  });
});
