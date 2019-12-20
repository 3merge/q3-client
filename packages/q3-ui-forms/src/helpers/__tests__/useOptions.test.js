import React from 'react';
import { useValue } from 'useful-state';
import cancelLoadOption from '../useOptions';

jest.mock('useful-state');

const stateFn = jest.fn();

let state;
let effect;

beforeEach(() => {
  stateFn.mockReset();

  effect = jest
    .spyOn(React, 'useEffect')
    .mockImplementation((v) => v());

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

  it('should stop options from loading on cancel', (done) => {
    const loadOptions = jest.fn().mockResolvedValue([]);
    effect.mockImplementation((v) => {
      v()();
    });

    cancelLoadOption({
      options: [],
      initialValue: 'foo',
      loadOptions,
    });

    expect(loadOptions).toHaveBeenCalledWith(
      'foo',
      expect.any(Object),
    );
    expect(effect).toHaveBeenCalledWith(
      expect.any(Function),
      ['foo'],
    );

    setTimeout(() => {
      expect(stateFn.mock.calls).toHaveLength(1);
      done();
    }, 100);
  });
});
