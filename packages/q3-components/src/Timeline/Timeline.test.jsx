import React from 'react';
import { transform, getName } from './Timeline';
import Timeline from './Timeline';

const entry = {
  diff: {
    kind: 'E',
    path: ['details', 'with'],
    lhs: 'elements',
    rhs: 'more',
  },
  modifiedBy: 'John Doe',
  modifiedOn: '2021-01-01',
};

test('should change data shape', () => {
  const res = transform(entry);
  expect(res).toEqual({
    op: 'Update',
    target: 'details',
    modifiedOn: '2021-01-01',
    modifiedBy: {
      firstName: 'John',
      lastName: 'Doe',
    },
    modified: {
      'details.with': {
        prev: 'elements',
        curr: 'more',
      },
    },
  });
});

test.each([[null], [undefined], [{}]])(
  'should return null when name is not valid',
  (name) => {
    expect(getName(name)).toBeNull();
  },
);

test('should return empty string for lastName', () => {
  expect(getName('foobar')).toEqual({
    firstName: 'foobar',
    lastName: '',
  });
});

test('should return name object', () => {
  expect(getName('john doe')).toEqual({
    firstName: 'john',
    lastName: 'doe',
  });
});

test.each([[true], [false]])(
  'should return null when fetching or no data',
  (fetching) => {
    const wrapper = global.shallow(
      <Timeline fetching={fetching} entries={[]} />,
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
  },
);
