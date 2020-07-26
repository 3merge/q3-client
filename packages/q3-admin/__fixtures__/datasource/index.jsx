import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import OpsHelper from './OpsHelper';
import characters from './characters';
import shows from './shows';
import users from './users';
import { BAR } from '../../src/__fixtures__/visualization';

const makeApiEndpoints = (
  mockInstance,
  seedData,
  { collectionName, resourceName, resourceNameSingular },
) => {
  const [dataSource] = React.useState(seedData);
  const ops = new OpsHelper(dataSource, collectionName);

  mockInstance
    // single resource
    .onGet(new RegExp(`${collectionName}\\/\\d+`))
    .reply((params) => {
      const output = ops.getData(
        resourceNameSingular,
        params,
      );

      return [200, output];
    });

  mockInstance
    // single resource
    .onPatch(new RegExp(`${collectionName}\\/\\d+`))
    .reply((params) => {
      const output = ops.patchData(
        resourceNameSingular,
        params,
      );

      return [200, output];
    });

  mockInstance
    // collection
    .onGet(new RegExp(collectionName))
    .reply(({ url }) => {
      if (url.includes('empty'))
        return [200, { [resourceName]: [] }];

      const urlParams = new URLSearchParams(url);
      const s = urlParams.get('search');

      return [
        200,
        {
          total: seedData.length,
          [resourceName]: s
            ? seedData.filter((i) =>
                i.name
                  .toLowerCase()
                  .includes(s.toLowerCase()),
              )
            : seedData,
        },
      ];
    });
};

// eslint-disable-next-line
export default ({ children }) => {
  const defineMockRoutes = (m) => {
    makeApiEndpoints(m, users, {
      collectionName: 'q3-api-users',
      resourceName: 'users',
      resourceNameSingular: 'user',
    });
    makeApiEndpoints(m, characters, {
      collectionName: 'characters',
      resourceName: 'characters',
      resourceNameSingular: 'character',
    });
    makeApiEndpoints(m, shows, {
      collectionName: 'shows',
      resourceName: 'shows',
      resourceNameSingular: 'show',
    });

    m.onGet(/reports/).reply(() => {
      return [200, { data: BAR }];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={250}>
      {children}
    </Rest>
  );
};
