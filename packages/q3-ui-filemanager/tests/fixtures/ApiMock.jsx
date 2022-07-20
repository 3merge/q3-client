import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { map, compact, last, isString, find } from 'lodash';
import data from './data.json';
import { collectionName, id } from './meta.json';

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

        setDataSource(currentState);

        return [
          200,
          {
            uploads: generateRelativePaths(currentState),
          },
        ];
      });

    mockApiInstance
      .onDelete(makeEndpoint(true))
      .reply(({ url }) => {
        const currentState = [...dataSource].filter(
          (item) => item.id !== last(url.split('/')),
        );

        setDataSource(currentState);
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

        setDataSource(currentState);
        return [204, {}];
      });

    mockApiInstance
      .onPatch(makeEndpoint())
      .reply(({ data: requestData, url }) => {
        const ids = new URLSearchParams(url.split('?')[1])
          .get('ids')
          .split(',');

        const { folderId = null } = JSON.parse(requestData);
        const currentState = [...dataSource].map((item) =>
          ids.includes(item.id)
            ? {
                ...item,
                folderId,
              }
            : item,
        );

        setDataSource(currentState);

        return [
          200,
          {
            uploads: generateRelativePaths(currentState),
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
            const [relativePath, file] = pair;
            currentState.push({
              name: file.name,
              relativePath,
              updatedAt: new Date(
                file.lastModifiedDate,
              ).toISOString(),
              size: file.size,
              id: getRandomArbitrary(1, 50000),
            });
          }
        } catch (e) {
          currentState.push({
            id: getRandomArbitrary(),
            ...JSON.parse(req.data),
          });
        }

        setDataSource(currentState);
        return new Promise((r) => {
          setTimeout(() => {
            r([
              201,
              {
                uploads:
                  generateRelativePaths(currentState),
              },
            ]);
          }, 5000);
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
