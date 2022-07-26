import React from 'react';
import DragToSelect from './DragToSelect';
import useMultiSelect from '../useMultiSelect';

jest.mock('../useMultiSelect');
jest.mock('./styles', () => () => ({}));

describe('DragToSelect', () => {
  it('should clear selection on directory change', () => {
    const spy = jest
      .spyOn(React, 'useEffect')
      .mockImplementation((fn) => fn());

    const clearSelected = jest.fn();
    jest.spyOn(React, 'useContext').mockReturnValue({
      current: 1,
    });

    useMultiSelect.mockReturnValue({
      clearSelected,
    });

    global.shallow(<DragToSelect />);

    expect(clearSelected).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.any(Function), [
      1,
    ]);
  });
});
