import React from 'react';
import { last } from 'lodash';
// eslint-disable-next-line
import Rest from 'q3-ui-test-utils/lib/rest';
import comments from './data.json';
import MockUserState from './MockUserState';

// eslint-disable-next-line
export default ({ children, delay, error }) => {
  const [dataSource, setDataSource] =
    React.useState(comments);

  const defineMockRoutes = (m) => {
    if (error) return;

    m.onGet(/\/test\/\d+\/comments/).reply(() => [
      200,
      { comments: dataSource },
    ]);

    m.onPost(/\/test\/\d+\/comments/).reply(({ data }) => {
      const args = JSON.parse(data);
      const newItem = {
        ...last(dataSource),
        createdAt: new Date(),
        'createdBy': {
          'id': '6091989dfc13ae035500000e',
          'firstName': 'Christine',
          'lastName': 'Allom',
          'photo':
            'https://robohash.org/itaqueomnisexplicabo.png?size=50x50&set=set1',
        },
        message: args.message,
        replies: args.replies,
        id: Date.now(),
      };

      const newState = dataSource.concat(newItem);
      setDataSource(newState);
      return [201, { comment: newItem }];
    });

    m.onPatch(/\/test\/\d+\/comments\/\d+/).reply(
      ({ data }) => {
        const args = JSON.parse(data);
        const newState = dataSource.map((item) =>
          item.id === args.id
            ? {
                ...item,
                ...args,
              }
            : item,
        );

        setDataSource(newState);

        return [
          200,
          {
            comments: newState,
          },
        ];
      },
    );

    m.onDelete(/\/test\/\d+\/comments\/\d+/).reply(() => [
      204,
    ]);
  };

  const Clone = (p) =>
    React.cloneElement(children, {
      ...p,
      collectionName: 'test',
      id: '1',
    });

  return (
    <MockUserState>
      <Rest define={defineMockRoutes} delay={delay}>
        <Clone />
      </Rest>
    </MockUserState>
  );
};
