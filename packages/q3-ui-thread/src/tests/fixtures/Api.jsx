import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last } from 'lodash';
import data from './data';
import { collectionName, id } from './meta';

const useMockData =
  (args = {}) =>
  (mockApiInstance) => {
    const { onGetError = false, onGetEmpty = false } = args;
    const [dataSource, setDataSource] = React.useState(
      onGetEmpty
        ? []
        : data.map((item) => ({
            ...item,
            id: String(item.id),
          })) || [],
    );

    const getRandomArbitrary = (min = 0, max = 50000) =>
      String(Math.random() * (max - min) + min).replace(
        /\./g,
        '',
      );

    const makeEndpoint = (asSub = false) =>
      new RegExp(
        `${collectionName}/${id}/thread${
          asSub ? '/\\d+' : ''
        }`,
      );

    mockApiInstance
      .onGet(makeEndpoint())
      .reply(onGetError ? 500 : 200, {
        thread: dataSource,
      });

    mockApiInstance
      .onPatch(makeEndpoint(true))
      .reply(({ data: requestData, url }) => {
        const { pin, ...rest } = JSON.parse(requestData);
        const currentState = [...dataSource];
        const obj = currentState.find(
          (item) =>
            String(item.id) ===
            String(last(url.split('/'))),
        );

        Object.assign(obj, {
          ...rest,
          pin: !!(pin === true || pin === 'true'),
        });

        setDataSource(currentState);
        return [
          200,
          {
            thread: currentState,
          },
        ];
      });

    mockApiInstance
      .onDelete(makeEndpoint(true))
      .reply(({ url }) => {
        const currentState = [...dataSource].filter(
          (item) =>
            String(item.id) !==
            String(last(url.split('/'))),
        );

        setDataSource(currentState);
        return [204, {}];
      });

    mockApiInstance
      .onPost(makeEndpoint())
      .reply(async (req) => {
        const currentState = [...dataSource];
        currentState.push({
          id: getRandomArbitrary(),
          createdAt: new Date().toISOString(),
          ...JSON.parse(req.data),
        });

        setDataSource(currentState);

        return [
          201,
          {
            thread: currentState,
          },
        ];
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
