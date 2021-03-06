import React from 'react';
import { last } from 'lodash';
// eslint-disable-next-line
import Rest from 'q3-ui-test-utils/lib/rest';
import comments from './data.json';
import MockUserState from './MockUserState';

// eslint-disable-next-line
export default ({ children, delay, error }) => {
  const [dataSource, setDataSource] = React.useState(
    comments,
  );

  const defineMockRoutes = (m) => {
    if (error) return;
    m.onGet(/\/test\/\d+\/comments/).reply(() => {
      return [200, { comments: dataSource }];
    });

    m.onPost(/\/test\/\d+\/comments/).reply(({ data }) => {
      const args = JSON.parse(data);
      const newItem = {
        ...last(dataSource),
        createdAt: new Date(),
        message: args.message,
        replies: args.replies,
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
            ? Object.assign(args, {
                message: args.message,
              })
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
