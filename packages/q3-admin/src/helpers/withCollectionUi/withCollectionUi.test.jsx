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
  it('should change ui', () => {
    jest
      .spyOn(React, 'useEffect')
      .mockImplementation((fn) => fn());

    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['foo', jest.fn()]);

    const El = withCollectionUi(Tester, {});
    global.shallow(<El />);

    expect(
      useCollectionUiLocalStorage.change,
    ).toHaveBeenCalledWith('foo');
  });

  it('should create ui menu items', () => {
    const setState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockReturnValue(['foo', setState]);

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

    uis[1].onClick();
    expect(setState).toHaveBeenCalledWith('bar');
  });
});
