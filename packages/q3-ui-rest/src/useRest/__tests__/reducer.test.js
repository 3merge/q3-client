import reducer from '../reducer';
import {
  FETCHING,
  FETCHED,
  UPDATED,
  CREATED,
  DELETED,
} from '../constants';

describe('reducer', () => {
  it('should set fetching to true', () => {
    expect(
      reducer({}, { type: FETCHING, key: 'required' }),
    ).toHaveProperty('fetching', true);
  });

  it('should log fetching results', () => {
    const data = { resource: { foo: 'bar' } };
    expect(
      reducer(
        {},
        {
          type: FETCHED,
          key: 'foo',
          data,
        },
      ),
    ).toMatchObject({
      fetching: false,
      ...data,
    });
  });

  it('should merge changes into state', () => {
    const data = { resource: { id: 1, name: 'bar' } };
    const prev = {
      resources: [
        {
          id: 1,
          name: 'foo',
        },
      ],
    };
    expect(
      reducer(prev, {
        key: 'resource',
        pluralized: 'resources',
        type: UPDATED,
        data,
      }),
    ).toMatchObject({
      ...data,
      resources: [
        {
          id: 1,
          name: 'bar',
        },
      ],
    });
  });

  it('should replace state on key match', () => {
    const data = {
      resource: [{ id: 1, name: 'bar' }],
    };
    const prev = {
      resource: [
        {
          id: 1,
          name: 'foo',
        },
        {
          id: 2,
          name: 'Hello',
        },
      ],
    };

    expect(
      reducer(prev, {
        key: 'resource',
        pluralized: 'resources',
        type: UPDATED,
        data,
      }),
    ).toMatchObject({
      ...data,
      resource: [
        {
          id: 1,
          name: 'bar',
        },
      ],
    });
  });

  it('should add/update array', () => {
    const data = {
      resource: {
        id: 4,
        name: 'garp',
      },
      resources: [
        { id: 1, name: 'bar' },
        { id: 3, name: 'quuz' },
      ],
    };

    const prev = {
      resources: [
        {
          id: 1,
          name: 'foo',
        },
        {
          id: 2,
          name: 'thunk',
        },
      ],
    };

    const out = reducer(prev, {
      key: 'resource',
      pluralized: 'resources',
      type: UPDATED,
      data,
    });

    expect(out.resources).toHaveLength(4);
    expect(out.resources).toEqual([
      { id: 1, name: 'bar' },
      {
        id: 2,
        name: 'thunk',
      },
      {
        id: 3,
        name: 'quuz',
      },
      {
        id: 4,
        name: 'garp',
      },
    ]);
  });

  it('should push into the state', () => {
    const data = { resource: { id: 2, name: 'bar' } };
    const prev = {
      resources: [
        {
          id: 1,
          name: 'foo',
        },
      ],
    };
    expect(
      reducer(prev, {
        key: 'resource',
        pluralized: 'resources',
        type: CREATED,
        data,
      }),
    ).toMatchObject(
      expect.objectContaining({
        resources: [data.resource, prev.resources[0]],
      }),
    );
  });

  it('should delete from the state', () => {
    const data = { id: 1 };
    const prev = {
      resources: [
        {
          id: 1,
          name: 'foo',
        },
      ],
    };
    expect(
      reducer(prev, {
        key: 'resource',
        pluralized: 'resources',
        type: DELETED,
        data,
      }),
    ).toMatchObject(
      expect.objectContaining({
        resources: [],
      }),
    );
  });
});
