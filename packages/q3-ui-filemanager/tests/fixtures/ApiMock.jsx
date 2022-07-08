import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import data from './data.json';
import { collectionName, id } from './meta.json';

const BASE_API_PATH = `${collectionName}\\/${id}\\/uploads`;

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

    // mockApiInstance
    //   .onPost(new RegExp(`${BASE_API_PATH}\\/uploads`))
    //   .reply(({ data: payload }) => {
    //     console.log(payload.entries());

    //     return [
    //       201,
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
