import React from 'react';
import withCollectionUi from './withCollectionUi';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

jest.mock('../../hooks/useCollectionUiLocalStorage', () => {
  const change = jest.fn();
  const fn = jest.fn().mockReturnValue({
    ui: null,
    change,
  });

  fn.change = change;
  return fn;
});

const Tester = () => <div />;

describe('withCollectionUi', () => {
  it('should create ui menu items', () => {
    useCollectionUiLocalStorage.mockReturnValue({
      cached: 'foo',
    });

    const El = withCollectionUi(Tester, {
      uis: [
        {
          ui: 'foo',
          forwardMe: true,
        },
        { ui: 'bar' },
      ],
    });

    const { forwardMe, uis } = global
      .shallow(<El />)
      .props();

    expect(forwardMe).toBeTruthy();
    expect(uis[0]).toHaveProperty('selected', true);
    expect(uis[1]).toHaveProperty('selected', false);
  });
});
