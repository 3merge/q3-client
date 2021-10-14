import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { asyncAct } from 'q3-ui-test-utils/lib/enzymeUtils';
import { useObjectIdLabels } from '../../../src';

jest.unmock('axios');

const networkResponse = [
  200,
  {
    users: [
      {
        name: 'Jon',
        id: 1,
      },
    ],
  },
];

const Stage = () => {
  const {
    getLabelFromState,
    getResults,
    state,
  } = useObjectIdLabels(
    '/users?sort=name',
    'users',
    'name',
  );

  return (
    <div id="test" test-data={state}>
      <button
        type="button"
        onClick={() => getResults('test')}
        id="load"
      >
        Get
      </button>
      <button
        type="button"
        onClick={() => getLabelFromState(2)}
        test-data={state}
        id="populate"
      >
        ID
      </button>
    </div>
  );
};

describe(useObjectIdLabels, () => {
  it('should fetch from API', async () => {
    const el = global.mount(
      <Rest
        delay={0}
        define={(m) => {
          m.onGet(/users/).reply((d) => {
            expect(d.url).toMatch('&search=test');
            return networkResponse;
          });
        }}
      >
        <Stage />
      </Rest>,
    );

    await asyncAct(() => {
      el.find('#load').simulate('click');
      return el;
    });

    expect(
      el.find('#test').prop('test-data'),
    ).toMatchObject({
      cache: {
        1: 'Jon',
      },
      loading: false,
      results: [
        {
          value: 1,
          label: 'Jon',
        },
      ],
    });
  });

  it('should lookup single result', async () => {
    const el = global.mount(
      <Rest
        delay={0}
        define={(m) => {
          m.onGet(/users/).reply((d) => {
            expect(d.url).toMatch('&_id=2');
            return networkResponse;
          });
        }}
      >
        <Stage />
      </Rest>,
    );

    await asyncAct(() => {
      el.find('#populate').simulate('click');
      return el;
    });

    expect(
      el.find('#test').prop('test-data'),
    ).toMatchObject({
      cache: {
        2: 'Unknown',
      },
      loading: false,
      results: [],
    });
  });

  it('should catch errors', async () => {
    const el = global.mount(
      <Rest
        delay={0}
        define={() => {
          // noop
        }}
      >
        <Stage />
      </Rest>,
    );

    await asyncAct(() => {
      el.find('#load').simulate('click');
      return el;
    });

    expect(
      el.find('#test').prop('test-data'),
    ).toMatchObject({
      cache: {},
      loading: false,
      results: [],
    });
  });
});
