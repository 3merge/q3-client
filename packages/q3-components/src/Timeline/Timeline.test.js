import { transform } from './Timeline';

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
