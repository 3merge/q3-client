import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
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
