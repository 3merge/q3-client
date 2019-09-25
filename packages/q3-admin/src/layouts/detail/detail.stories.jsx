import React from 'react';
import { storiesOf } from '@storybook/react';
import JSONPretty from 'react-json-pretty';
import Detail from '.';

const convertFunctionsIntoStrings = (a) =>
  Object.entries(a).reduce(
    (acc, [key, val]) =>
      Object.assign(acc, {
        [key]: typeof val === 'function' ? 'fn' : val,
      }),
    {},
  );

storiesOf('Layouts|Detail', module).add('Routes', () => {
  const Simulated = () => {
    const [fetching, setFetching] = React.useState(true);
    const [data, setData] = React.useState();

    React.useEffect(() => {
      setTimeout(() => {
        setFetching(false);
        setData({
          foo: 'bar',
        });
      }, 2000);
    }, []);

    return (
      <Detail
        canDelete
        loading={fetching}
        name="Foo"
        rootPath="/Iframe.Html"
        views={(a) => [
          {
            to: '',
            label: 'first',
            component: () => (
              <JSONPretty
                data={convertFunctionsIntoStrings(a)}
              />
            ),
          },
          {
            to: '/second',
            label: 'second',
            component: () => (
              <JSONPretty
                data={convertFunctionsIntoStrings(a)}
              />
            ),
          },
        ]}
        services={{
          delete: () => null,
          put: () => null,
          patch: () => null,
          get: () => null,
        }}
        data={data}
      />
    );
  };

  return <Simulated />;
});
