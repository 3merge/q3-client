import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { compact, last, isString } from 'lodash';
import data from './data.json';
import { collectionName, id } from './meta.json';

const useMockData =
  (args = {}) =>
  (mockApiInstance) => {
    const { onGetError = false } = args;
    const [dataSource, setDataSource] = React.useState(
      data.uploads || [],
    );

    const removeTrailingSlash = (str) =>
      isString(str) ? str.replace(/\/+$/, '') : str;

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
        uploads: dataSource,
      });

    mockApiInstance
      .onPatch(makeEndpoint(true))
      .reply(({ data: requestData, url }) => {
        const { name, folder } = JSON.parse(requestData);
        const currentState = [...dataSource];
        const obj = currentState.find(
          (item) => item.id === last(url.split('/')),
        );

        const ext = `.${last(obj.name.split('.'))}`;

        if (folder || folder === null)
          Object.assign(obj, {
            relativePath: compact([
              removeTrailingSlash(folder),
              last(obj.relativePath.split('/')),
            ]).join('/'),
          });

        if (name)
          Object.assign(obj, {
            name: name + ext,
            relativePath:
              obj.relativePath
                .split('/')
                .slice(0, -1)
                .concat(name)
                .join('/') + ext,
          });

        setDataSource(currentState);

        return [
          200,
          {
            uploads: currentState,
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

        const { folder, replace } = JSON.parse(requestData);

        const currentState = [...dataSource].map((item) =>
          ids.includes(item.id)
            ? {
                ...item,
                // simulates backend functionality
                relativePath: [
                  folder,
                  replace
                    ? last(item.relativePath.split('/'))
                    : item.relativePath,
                ].join('/'),
              }
            : item,
        );

        setDataSource(currentState);

        return [
          200,
          {
            uploads: currentState,
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
                uploads: currentState,
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
