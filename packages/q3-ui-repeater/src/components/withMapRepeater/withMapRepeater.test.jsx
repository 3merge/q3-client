import React from 'react';
import { withMapRepeater } from '..';

const Test = ({ data, children }) => (
  <div>
    {data.map((x) => (
      <div key={x}>{x}</div>
    ))}
    {children}
  </div>
);

test('should return component', () => {
  const Component = withMapRepeater(Test);
  const { groupName, data } = global
    .shallow(
      <Component data={{ 'names': ['john', 'doe'] }}>
        <div>i am a child</div>
      </Component>,
    )
    .props();

  expect(groupName).toBe('names');
  expect(data).toEqual(['john', 'doe']);
});
