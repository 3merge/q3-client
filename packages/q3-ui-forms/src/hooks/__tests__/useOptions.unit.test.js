import React from 'react';
import { useValue } from 'useful-state';
import cancelLoadOption from '../useOptions';

jest.mock('useful-state');

const stateFn = jest.fn();

let state;

beforeEach(() => {
  stateFn.mockReset();

  jest.spyOn(React, 'useContext').mockReturnValue({
    values: {},
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((v) => v());

  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => () => fn());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: null,
  });

  state = jest
    .spyOn(React, 'useState')
    .mockImplementation((v) => [v, stateFn]);
});

describe('useOptions', () => {
  it('should pass arguments to state', () => {
    cancelLoadOption({
      options: [],
      loadOptions: null,
      initialValue: 'foo',
    });

    expect(state).toHaveBeenCalledWith(false);
    expect(state).toHaveBeenCalledWith([]);
    expect(useValue).toHaveBeenCalledWith('foo');
  });

  it('should return default state properties', () => {
    expect(
      cancelLoadOption({
        options: [],
        loadOptions: null,
        initialValue: 'foo',
      }),
    ).toMatchObject({
      loading: false,
      value: 'foo',
      onChange: expect.any(Function),
      items: [],
    });
  });
});
