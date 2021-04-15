import React from 'react';
import moxios from 'jest-mock-axios';
import { act } from 'react-dom/test-utils';
import useRest from '../useRest';

jest.mock('axios');

const MockComponent = () => {
  const { bars = [], post } = useRest({
    url: '/foo',
    key: 'bar',
    pluralized: 'bars',
    runOnInit: true,
  });

  const addToState = () =>
    post(
      {
        name: 'Bar',
      },
      {},
    );

  return (
    <div>
      <ul>
        {bars.map((bar) => (
          <li key={bar.id}>{bar.name}</li>
        ))}
      </ul>
      <button onClick={addToState} type="button">
        Add to state
      </button>
    </div>
  );
};

const renderer = () => {
  const el = global.mount(<MockComponent />);
  act(() => {
    expect(moxios.get).toHaveBeenCalledWith('/foo');
    moxios.mockResponse({
      data: {
        bars: [
          { id: 1, name: 'Quuz' },
          { id: 2, name: 'Garply' },
        ],
      },
    });
  });

  return el;
};

describe('useRest integration', () => {
  it('should get state', (done) => {
    const el = renderer();
    setTimeout(() => {
      el.update();
      expect(el.find('li')).toHaveLength(2);
      done();
    });
  });

  it('should add to state', (done) => {
    const el = renderer();
    el.find('button').simulate('click');

    act(() => {
      expect(moxios.post).toHaveBeenCalledWith(
        '/foo',
        expect.any(Object),
      );
      moxios.mockResponse({
        data: {
          bar: { id: 3, name: 'Bar' },
        },
      });
    });

    setTimeout(() => {
      el.update();
      expect(el.find('li')).toHaveLength(3);
      done();
    });
  });
});
