import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last } from 'lodash';
import data from './data.json';
import { collectionName, id } from './meta.json';

const useMockData =
  (args = {}) =>
  (mockApiInstance) => {
    const { onGetError = false } = args;
    const [dataSource, setDataSource] = React.useState(
      data.uploads || [],
    );

    const makeEndpoint = (asSub = false) =>
      new RegExp(
        `${collectionName}/${id}/uploads${
          asSub ? '/\\d+' : ''
        }`,
      );

    const handleDelete = (uploadId) =>
      setDataSource((prevState) =>
        prevState.filter((item) => item.id !== uploadId),
      );

    mockApiInstance
      .onGet(makeEndpoint())
      .reply(onGetError ? 500 : 200, {
        uploads: dataSource,
      });

    mockApiInstance
      .onPatch(makeEndpoint(true))
      .reply(({ data: requestData, url }) => {
        const currentState = [...dataSource];
        const obj = currentState.find(
          (item) => item.id === last(url.split('/')),
        );

        Object.assign(obj, JSON.parse(requestData));
        setDataSource(currentState);

        return [
          200,
          {
            uploads: currentState,
          },
        ];
      });

    mockApiInstance
      .onPatch(makeEndpoint())
      .reply(({ data: requestData, url }) => {
        const ids = new URLSearchParams(url.split('?')[1])
          .get('ids')
          .split(',');

        const { folder } = JSON.parse(requestData);
        const currentState = [...dataSource].map((item) =>
          ids.includes(item.id)
            ? {
                ...item,
                // simulates backend functionality
                relativePath: [
                  folder,
                  item.relativePath,
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

    // mockApiInstance
    //   .onDelete(new RegExp(`${BASE_API_PATH}\\/\\d+`))
    //   .reply(({ data: op }) => {
    //     console.log(op);
    //     handleDelete(1);

    //     return [
    //       200,
    //       {
    //         uploads: dataSource,
    //       },
    //     ];
    //   });
  };

const ApiMock = (props) => (
  <Rest
    define={useMockData(props)}
    delay={1000}
    {...props}
  />
);

export default ApiMock;
