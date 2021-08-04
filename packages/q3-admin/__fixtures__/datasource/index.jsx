import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { browser, object } from 'q3-ui-helpers';
import OpsHelper from './OpsHelper';
import characters from './characters';
import shows from './shows';
import users from './users';
import uploads from './files';

const makeApiEndpoints = (
  mockInstance,
  seedData,
  { collectionName, resourceName, resourceNameSingular },
) => {
  const [dataSource] = React.useState(seedData);
  const ops = new OpsHelper(dataSource, collectionName);

  mockInstance.onGet(/system-notifications/).reply(200, {
    notifications: [
      {
        label: 'bucket/file',
        url: 'https://google.caca',
      },
    ],
  });

  // this will expire
  mockInstance.onGet(/documentation/).reply(200, {
    'token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjE2MTUwMTMsImVtYWlsIjoiZ2VudGVrQDNtZXJnZS5jYSIsIm5hbWUiOiJHZW50ZWsgQmFjayBPZmZpY2UiLCJpYXQiOjE2MjE2MDc4MTJ9.RZ_rBEwarGwspZ1qya68ShKVhpDxlM6QHX1A_OAgCX0',
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
    current: {
      'id': '1',
      'name': 'Rick and Morty',
      'photo':
        'https://cdn.vox-cdn.com/thumbor/G8A4RF-QWQl7jItQw93r402os_0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10816041/rick_and_morty_s02_still.jpg',
      'description': '',
      'createdBy': {
        'firstName': 'Dan',
      },
      'createdAt': '2017-11-04T18:48:46.250Z',
      'updatedAt': '2018-01-10T18:20:41.703Z',
      'movies': [
        {
          'id': '1',
          'title': 'Completed Season 1',
        },
        {
          'id': '2',
          'title': 'Completed Season 2',
        },
        {
          'id': '3',
          'title': 'Completed Season 3',
        },
      ],
    },
    changes: [
      {
        added: {
          name: 'Rick Sanchez Show',
        },
        date: new Date(),
        user: {
          firstName: 'Jon',
          lastName: 'Snow',
        },
      },
      {
        deleted: {
          movies: {
            _id: '1',
            title: 'Adventures in space',
          },
        },
        date: new Date(),
        user: {
          firstName: 'Jon',
          lastName: 'Snow',
        },
      },
      {
        updated: {
          movies: {
            'id': '2',
            'title': 'Complete Season 2',
          },
        },
        date: new Date(),
        user: {
          firstName: 'Jon',
          lastName: 'Snow',
        },
      },
    ],
  });

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
