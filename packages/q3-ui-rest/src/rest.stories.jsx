import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-axios-mock';
import SnackbarProvider from 'q3-ui-forms';
import useRest from '.';

const StatefulGet = () => {
  const rest = useRest({
    url: '/rest',
    runOnInit: true,
    key: 'name',
    pluralized: 'names',
  });

  return (
    <>
      <button type="button" onClick={() => rest.get()}>
        Click to reload data:{' '}
        {rest.loading ? 'Loading ....' : null}
      </button>
      <code>{JSON.stringify(rest.names)}</code>
    </>
  );
};

const StatefulPatch = () => {
  const rest = useRest({
    url: '/rest',
    key: 'name',
    pluralized: 'names',
  });
  console.log(rest.patch);
  return (
    <>
      <button type="button" onClick={rest.patch(1)}>
        Click to patch (last updated:)
        {rest.loading ? 'Loading ....' : null}
      </button>
    </>
  );
};

storiesOf('REST utils', module)
  .add('304 cache', () => {
    const definePermission = (m) => {
      m.onGet('/rest')
        .replyOnce(
          200,
          {
            names: [
              { name: 'Albert' },
              { name: 'John' },
              { name: 'Greg' },
              { name: 'Mary' },
            ],
          },
          {
            ETag: '275-G6p5Qbvjb7eETPVAmGeJb4Xw6+c',
          },
        )
        .onGet('/rest')
        .reply(
          304,
          {},
          {
            ETag: '275-G6p5Qbvjb7eETPVAmGeJb4Xw6+c',
          },
        );
    };

    return (
      <SnackbarProvider>
        <MockApi define={definePermission}>
          <StatefulGet />
        </MockApi>
      </SnackbarProvider>
    );
  })
  .add('412 race conditions', () => {
    const definePermission = (m) => {
      m.onPatch('/rest/1')
      .reply(412, {});
    };

    return (
      <SnackbarProvider>
        <MockApi define={definePermission}>
          <StatefulPatch />
        </MockApi>
      </SnackbarProvider>
    );
  });
