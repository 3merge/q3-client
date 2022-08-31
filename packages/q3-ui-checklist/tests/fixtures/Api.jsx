import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last } from 'lodash';
import data from './data.json';
import { collectionName, id } from './meta.json';

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
            checked: false,
          })) || [],
    );

    const getRandomArbitrary = (min = 0, max = 50000) =>
      String(Math.random() * (max - min) + min).replace(
        /\./g,
        '',
      );

    const makeEndpoint = (includeId = false) =>
      new RegExp(`tasks${includeId ? '/\\d+' : ''}`);

    mockApiInstance
      .onGet(makeEndpoint())
      .reply(onGetError ? 500 : 200, {
        tasks: dataSource,
      });

    mockApiInstance
      .onPatch(makeEndpoint(true))
      .reply(({ data: requestData, url }) => {
        const currentState = [...dataSource];
        const obj = currentState.find(
          (item) =>
            String(item.id) ===
            String(last(url.split('/'))),
        );

        Object.assign(obj, JSON.parse(requestData));

        setDataSource(currentState);
        return [
          200,
          {
            tasks: currentState,
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
            tasks: currentState,
          },
        ];
      });
  };

const ApiMock = (props) => (
  <Rest
    define={useMockData(props)}
    delay={180}
    {...props}
  />
);

export default ApiMock;
