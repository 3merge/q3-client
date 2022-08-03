import React from 'react';
import useArticleAsideAction from './useArticleAsideAction';

let close;
let setState;

beforeEach(() => {
  close = jest.fn();
  setState = jest.fn();

  jest.spyOn(React, 'useContext').mockReturnValue({
    id: 1,
    setState,
    close,
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useArticleAsideAction', () => {
  it('should compare ids', () => {
    const expectAsideActionIsOn = (actionId) =>
      expect(useArticleAsideAction({ actionId }).isOn);

    expectAsideActionIsOn(1).toBeTruthy();
    expectAsideActionIsOn(2).toBeFalsy();
  });

  it('should call toggle automatically', () => {
    useArticleAsideAction({ autoOpen: true });
    expect(setState).toHaveBeenCalled();
  });

  it('should not toggle automatically', () => {
    useArticleAsideAction({ autoOpen: false });
    expect(setState).not.toHaveBeenCalled();
  });

  it('should close', () => {
    useArticleAsideAction({
      actionId: 1,
    }).toggle();

    expect(close).toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalled();
  });
});
