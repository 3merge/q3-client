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
