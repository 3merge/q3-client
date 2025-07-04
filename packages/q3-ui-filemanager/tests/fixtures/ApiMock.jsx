import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { map, compact, last, find } from 'lodash';
import data from './data.json';
import { collectionName, id } from './meta.json';
import { normalize } from '../../src/utils';

const explodeName = (name) => {
  const r = String(name).match(
    /\[([a-zA-Z0-9])*\]/,
  );

  if (!r)
    return {
      folderId: null,
      name,
    };

  const [folderInParenthesis] = r;
  const folderId = normalize(
    folderInParenthesis.slice(1, -1),
  );

  const isolatedName = name.replace(
    folderInParenthesis,
    '',
  );

  return {
    folderId,
    name: isolatedName,
  };
};

/**
 * Mimics server-side functionality in Q3.
 */
export const generateRelativePaths = (a) =>
  map(a, (xs) => {
    const recursivelyBuildRelativePath = (folderId) => {
      if (!folderId) return null;
      const obj = find(a, (item) => item.id === folderId);
      if (!obj) return null;
      if (obj.folderId)
        return compact([
          recursivelyBuildRelativePath(obj.folderId),
          obj.name,
        ]).join('/');
      return obj.name;
    };

    return {
      ...xs,
      relativePath: compact([
        recursivelyBuildRelativePath(xs.folderId),
        xs.name,
      ]).join('/'),
    };
  });

const useMockData =
  (args = {}) =>
  (mockApiInstance) => {
    const { onGetError = false } = args;
    const [dataSource, setDataSource] = React.useState(
      generateRelativePaths(data.uploads || []),
    );

    const setDataSourceWithRelativePaths = (xs) => {
      const output = generateRelativePaths(xs);
      setDataSource(output);
      return output;
    };

    const getRandomArbitrary = (min = 0, max = 50000) =>
      String(Math.random() * (max - min) + min).replace(
        /\./g,
        '',
      );

    const makeEndpoint = (asSub = false) =>
      new RegExp(
        `${collectionName}/${id}/uploads${
          asSub ? '/\\d+' : ''
        }`,
      );

    React.useEffect(() => {
      setTimeout(() => {
        setDataSource((currentState) =>
          currentState.concat({
            id: getRandomArbitrary(),
            name: 'testing.jpg',
            relativePath: 'testing.jpg',
          }),
        );
      }, 10000);
    }, []);

    mockApiInstance
      .onPost('/s3-upload')
      .reply(201, {
        url: 'https://example.com/s3-upload',
      });

    mockApiInstance
      .onPost('/s3-upload-transfer')
      .reply((req) => {
          const { name, size } = JSON.parse(req.data);
          const { folderId, name: isolatedName } = explodeName(name);

          dataSource.push({
            id: getRandomArbitrary(),
            folderId,
            name: isolatedName,
            size,
          })

        return [201, {
          uploads: generateRelativePaths(dataSource),
        }]
      });

    mockApiInstance
      .onGet(makeEndpoint())
      .reply(onGetError ? 500 : 200, {
        uploads: generateRelativePaths(dataSource),
      });

    mockApiInstance
      .onPatch(makeEndpoint(true))
      .reply(({ data: requestData, url }) => {
        const { name, ...rest } = JSON.parse(requestData);
        const currentState = [...dataSource];
        const obj = currentState.find(
          (item) => item.id === last(url.split('/')),
        );

        Object.assign(obj, rest);

        if (name)
          Object.assign(obj, {
            name: obj.folder
              ? name
              : `${name}.${last(obj.name.split('.'))}`,
          });

        return [
          200,
          {
            uploads:
              setDataSourceWithRelativePaths(currentState),
          },
        ];
      });

    mockApiInstance
      .onDelete(makeEndpoint(true))
      .reply(({ url }) => {
        const incomingId = last(url.split('/'));
        const currentState = [...dataSource].filter(
          (item) =>
            item.id !== incomingId &&
            (!item.folderId ||
              item.folderId !== incomingId),
        );

        setDataSourceWithRelativePaths(currentState);
        return [204, {}];
      });

    mockApiInstance
      .onDelete(makeEndpoint())
      .reply(({ url }) => {
        const ids = new URLSearchParams(url.split('?')[1])
          .get('ids')
          .split(',');

        const currentState = [...dataSource].filter(
          (item) => !ids.includes(item.id),
        );

        setDataSourceWithRelativePaths(currentState);
        return [204, {}];
      });

    mockApiInstance
      .onPatch(makeEndpoint())
      .reply(({ data: requestData, url }) => {
        const ids = new URLSearchParams(
          url.split('?')[1],
        ).getAll('ids[]');
        const { folderId = null } = JSON.parse(requestData);
        const currentState = [...dataSource].map((item) =>
          ids.includes(item.id)
            ? {
                ...item,
                folderId,
              }
            : item,
        );

        return [
          200,
          {
            uploads:
              setDataSourceWithRelativePaths(currentState),
          },
        ];
      });

    mockApiInstance
      .onPost(makeEndpoint())
      .reply(async (req) => {
        const currentState = [...dataSource];

        try {
          // eslint-disable-next-line
          for (const pair of req.data.entries()) {
            const [, file] = pair;

            currentState.push({
              ...explodeName(file.name),
              id: getRandomArbitrary(1, 50000),
              updatedAt: new Date().toISOString(),
              size: file.size,
              folder: false,
            });
          }
        } catch (e) {
          currentState.push({
            id: getRandomArbitrary(),
            ...JSON.parse(req.data),
          });
        }

        return new Promise((r) => {
          setTimeout(() => {
            r([
              201,
              {
                uploads:
                  setDataSourceWithRelativePaths(
                    currentState,
                  ),
              },
            ]);
          }, 2000);
        });
      });
  };

const ApiMock = (props) => (
  <Rest
    define={useMockData(props)}
    delay={1000}
    {...props}
  />
);

export default ApiMock;
