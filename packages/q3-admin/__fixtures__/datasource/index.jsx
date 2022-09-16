import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import moment from 'moment';
import { browser } from 'q3-ui-helpers';
import { defineMockRoutes as defineMockRoutesForEmailEditorAddOn } from 'q3-ui-emaileditor/lib/tests/fixtures/RestSource';
import { defineMockRoutes as defineMockRoutesForQueueLogsAddOn } from 'q3-ui-queuelogs/lib/tests/fixtures/RestSource';
import thread from 'q3-ui-thread/lib/tests/fixtures/data.json';
import OpsHelper from './OpsHelper';
import characters from './characters';
import shows from './shows';
import users from './users';
import uploads from './files';
import domain from './domain.json';

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

  mockInstance.onGet(/domain/).reply(200, {
    domain,
  });

  mockInstance.onPost(/domain/).reply(async ({ data }) => [
    200,
    {
      domain: await applyFormData(domain, data),
    },
  ]);

  mockInstance.onGet(/system-notifications/).reply(() => [
    200,
    {
      notifications: [
        {
          id: 1,
          label: 'bucket/file',
          url: 'https://google.ca',
          createdAt: moment()
            .subtract(2, 'day')
            .toISOString(),
          messageType: 'download',
        },
        {
          id: 5,
          label: 'newApp',
          localUrl: '/shows/1',
          createdAt: moment()
            .subtract(2, 'day')
            .toISOString(),
          hasSeen: true,
          hasDownloaded: true,
        },
        {
          id: 7,
          label: 'newApp',
          localUrl: '/shows/1',
          createdAt: moment()
            .subtract(2, 'day')
            .toISOString(),
        },
        {
          id: 2,
          label: 'New app created',
          url: '/app/1',
          createdAt: moment().toISOString(),
          hasSeen: true,
          hasDownloaded: true,
          messageType: 'document',
        },
        {
          id: 3,
          label: 'Notice!',
          excerpt: 'This is a description',
          createdAt: moment()
            .subtract(3, 'minute')
            .toISOString(),
        },
      ],
    },
  ]);

  // this will expire
  mockInstance.onGet(/documentation/).reply(200, {
    'token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjE2MTUwMTMsImVtYWlsIjoiZ2VudGVrQDNtZXJnZS5jYSIsIm5hbWUiOiJHZW50ZWsgQmFjayBPZmZpY2UiLCJpYXQiOjE2MjE2MDc4MTJ9.RZ_rBEwarGwspZ1qya68ShKVhpDxlM6QHX1A_OAgCX0',
  });

  mockInstance.onGet(/sys\/segments/).reply(200, {
    segments: [
      {
        label: 'Date Range',
        value: '?demo<=2021-08-01&demo>=2021-01-01',
        collectionName: 'shows',
      },
      {
        id: 1,
        folder: true,
        label: 'Tests',
        collectionName: 'shows',
      },
      {
        folderId: 1,
        label: 'One',
        value:
          '?demo<=2021-08-01&demo>=2021-01-01&search=Test',
        collectionName: 'shows',
      },
      {
        folderId: 1,
        label: 'Two',
        value:
          '?demo<=2021-08-01&demo>=2021-01-01&search=Testing',
        collectionName: 'shows',
      },
      {
        folderId: 2,
        label: 'Three',
        value:
          '?demo<=2021-08-01&demo>=2021-01-01&search=Testing3',
        collectionName: 'shows',
      },
      {
        id: 2,
        label: 'Tests v2',
        folder: true,
        collectionName: 'shows',
      },
      {
        id: 3,
        label: 'Sub sub',
        folder: true,
        collectionName: 'shows',
        folderId: 2,
      },
      {
        id: 4,
        label: 'Last place',
        value: '?value',
        collectionName: 'shows',
        folderId: 3,
      },
    ],
  });

  mockInstance.onGet(/reports/).reply(200, {
    data: {
      data: [
        {
          Shows: 'Rick and Morty',
          Streams: 1000000,
        },
        {
          Shows: "Bob's Burgers",
          Streams: 345000,
        },
        {
          Shows: 'Simpsons',
          Streams: 9972346,
        },
      ],
      name: 'Shows',
      value: 'Streams',
    },
  });

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
