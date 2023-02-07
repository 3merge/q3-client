import React from 'react';
// eslint-disable-next-line
import Rest from 'q3-ui-test-utils/lib/rest';
import { useNotificationsFixture } from 'q3-ui-notifications';
import { browser } from 'q3-ui-helpers';
import { defineMockRoutes as defineMockRoutesForEmailEditorAddOn } from 'q3-ui-emaileditor/lib/tests/fixtures/RestSource';
import { defineMockRoutes as defineMockRoutesForQueueLogsAddOn } from 'q3-ui-queuelogs/lib/tests/fixtures/RestSource';
import thread from 'q3-ui-thread/lib/tests/fixtures/data.json';
import useFixtureData from 'q3-ui-navbar/tests/fixtures/useFixtureData';
import OpsHelper from './OpsHelper';
import characters from './characters';
import shows from './shows';
import users from './users';
import uploads from './files';
import domain from './domain.json';
import makeReportFixtures from './reports';

const applyFormData = async (src, data) => {
  const target = { ...src };

  if (data instanceof FormData) {
    const resp = [];
    // eslint-disable-next-line
    for (const pair of data.entries()) {
      resp.push([pair[0], pair[1]]);
    }

    await Promise.all(
      resp.map(async ([k, v]) => {
        if (v instanceof File) {
          await new Promise((r) => {
            browser.getFileThumbnail(v, (err, photo) => {
              // this is similar to how the photo stores on the server
              const makeCdnPath = () =>
                String(v.name).replace('FilePath', '');

              target[
                k === 'featuredUpload'
                  ? 'photo'
                  : makeCdnPath()
              ] = photo;
              r();
            });
          });
        } else target[k] = v;
      }),
    );
  } else {
    const raw =
      typeof data === 'string' ? JSON.parse(data) : data;

    if ('featuredUpload' in raw) {
      // eslint-disable-next-line
      raw.photo = raw.featuredUpload;
    }

    Object.assign(target, raw);
  }

  return target;
};

const makeApiEndpoints = (
  mockInstance,
  seedData,
  { collectionName, resourceName, resourceNameSingular },
) => {
  const [dataSource] = React.useState(seedData);
  const ops = new OpsHelper(dataSource, collectionName);
  const { data: segments, update: updateSegments } =
    useFixtureData([
      {
        id: 123421,
        collectionName: 'shows',
        label: 'Yes!',
        folder: true,
      },
      {
        id: 123422341,
        collectionName: 'shows',
        label: 'Subsub',
        value: '?foo=string(bar)',
        folderId: 123421,
      },
    ]);

  useNotificationsFixture(mockInstance);

  mockInstance.onGet(/domain/).reply(200, {
    domain,
  });

  mockInstance.onPost(/domain/).reply(async ({ data }) => [
    200,
    {
      domain: await applyFormData(domain, data),
    },
  ]);

  mockInstance.onGet(/system-counters/).reply(() => [
    200,
    {
      counters: {
        notifications: 9,
        shows: 3,
        123421: 2,
        123422341: 1,
      },
    },
  ]);

  // this will expire
  mockInstance.onGet(/documentation/).reply(200, {
    'token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjE2MTUwMTMsImVtYWlsIjoiZ2VudGVrQDNtZXJnZS5jYSIsIm5hbWUiOiJHZW50ZWsgQmFjayBPZmZpY2UiLCJpYXQiOjE2MjE2MDc4MTJ9.RZ_rBEwarGwspZ1qya68ShKVhpDxlM6QHX1A_OAgCX0',
  });

  mockInstance.onGet(/system-segments/).reply(200, {
    segments,
  });

  mockInstance.onPut(/system-segments/).reply((args) => [
    200,
    {
      segments: updateSegments(JSON.parse(args.data)),
    },
  ]);

  mockInstance.onGet(/reports/).reply(makeReportFixtures);

  mockInstance.onGet(/audit/).reply(200, {
    changes: [
      {
        additions: [
          {
            name: 'Rick Sanchez Show',
          },
        ],
        date: new Date(),
        user: 'Jon Snow',
      },
      {
        deletions: [
          {
            movies: {
              _id: '1',
              title: 'Adventures in space',
            },
          },
        ],
        date: new Date(),
        user: 'Jon Snow',
      },
      {
        updates: [
          {
            movies: {
              'id': '2',
              'title': 'Complete Season 2',
            },
          },
        ],
        date: new Date(),
        user: 'Arya Stark',
      },
    ],
  });

  mockInstance
    .onDelete(
      new RegExp(`${collectionName}\\/\\d+\\/uploads/\\d+`),
    )
    .reply(() => [
      200,
      {
        uploads,
      },
    ]);

  mockInstance
    .onGet(new RegExp(`${collectionName}\\/\\d+\\/uploads`))
    .reply(200, {
      uploads,
    });

  mockInstance
    .onGet(new RegExp(`${collectionName}\\/\\d+\\/uploads`))
    .reply(200, {
      uploads,
    });

  mockInstance
    .onGet(new RegExp(`${collectionName}\\/\\d+\\/thread`))
    .reply(200, {
      thread,
    });

  mockInstance
    .onPost(
      new RegExp(`${collectionName}\\/\\d+\\/seasons`),
    )
    .reply((a) => [
      200,
      {
        seasons: [
          {
            id: 1,
            title: 'One',
          },
          {
            id: 2,
            title: 'Two',
          },
          {
            id: 3,
            ...JSON.parse(a.data),
          },
        ],
      },
    ]);

  mockInstance
    .onGet(new RegExp(`${collectionName}\\/\\d+\\/seasons`))
    .reply(200, {
      seasons: [
        {
          id: 1,
          title: 'One',
        },
        {
          id: 2,
          title: 'Two',
        },
      ],
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
      // console.log(url);
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

  mockInstance
    // collection
    .onPost(new RegExp(collectionName))
    .reply(({ data }) => [
      201,
      {
        message: 'Done',
        [resourceNameSingular]: ops.onCreate(data),
      },
    ]);
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

    m.onPost(/profile/).reply(async ({ data }) => [
      200,
      {
        profile: await applyFormData(users[0], data),
      },
    ]);

    defineMockRoutesForEmailEditorAddOn({})(m);
    defineMockRoutesForQueueLogsAddOn({})(m);
  };

  return (
    <Rest define={defineMockRoutes} delay={1000}>
      {children}
    </Rest>
  );
};
