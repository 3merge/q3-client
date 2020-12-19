import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { browser, object } from 'q3-ui-helpers';
import OpsHelper from './OpsHelper';
import characters from './characters';
import shows from './shows';
import users from './users';
import uploads from './files';
import { BAR } from '../../src/__fixtures__/visualization';

const makeApiEndpoints = (
  mockInstance,
  seedData,
  { collectionName, resourceName, resourceNameSingular },
) => {
  const [dataSource] = React.useState(seedData);
  const ops = new OpsHelper(dataSource, collectionName);

  mockInstance
    .onDelete(
      new RegExp(`${collectionName}\\/\\d+\\/uploads/\\d+`),
    )
    .reply(() => {
      return [
        200,
        {
          uploads,
        },
      ];
    });

  mockInstance
    .onGet(new RegExp(`${collectionName}\\/\\d+\\/uploads`))
    .reply(200, {
      uploads,
    });

  mockInstance
    .onPost(
      new RegExp(`${collectionName}\\/\\d+\\/uploads`),
    )
    .reply(({ data }) => {
      const [pair] = data.entries();

      return [
        201,
        {
          uploads: [
            ...uploads,
            {
              ...pair[1],
              url: uploads[0].url,
              name: pair[0],
              relativePath: pair[1].relativePath,
            },
          ],
        },
      ];
    });

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

    m.onPost(/profile/).reply(async ({ data }) => {
      const [profile] = users;

      if (
        typeof data !== 'string' &&
        object.isFn(data.get)
      ) {
        await new Promise((r) =>
          browser.getFileThumbnail(
            data.get('featuredUpload'),
            (err, photo) => {
              profile.photo = photo;
              r();
            },
          ),
        );
      } else {
        const json = JSON.parse(data);

        // virtualized on the server
        if (json.featuredPhoto === null)
          json.photo = json.featuredPhoto;

        Object.assign(profile, json);
      }

      return [
        200,
        {
          profile: {
            ...profile,
          },
        },
      ];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={1000}>
      {children}
    </Rest>
  );
};
