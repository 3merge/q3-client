import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';

// eslint-disable-next-line
export default ({ children, delay, error }) => {
  const defineMockRoutes = (m) => {
    if (error) return;

    m.onGet('/test/1/comments').reply(async () => {
      return [
        200,
        {
          comments: [],
        },
      ];
    });
  };

  const Clone = (p) =>
    React.cloneElement(children, {
      ...p,
      collectionName: 'test',
      id: '1',
    });

  return (
    <Rest define={defineMockRoutes} delay={delay}>
      <Clone />
    </Rest>
  );
};
