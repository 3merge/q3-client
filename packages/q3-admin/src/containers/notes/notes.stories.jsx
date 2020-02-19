import React from 'react';
import Mock from 'q3-ui-test-utils/lib/rest';
import { AuthContext } from 'q3-ui-permissions';
import Notes from '.';

export default {
  title: 'Q3 Admin|Containers/Notes',
  parameters: {
    component: Notes,
    componentSubtitle: 'Commenting threading feature',
  },
};

const genComment = () => ({
  id: 1,
  message: 'Comment content goes here',
});

const genPermission = (op) => ({
  ownership: 'any',
  coll: 'test',
  fields: 'thread',
  op,
});

const mockRest = (r) => {
  const [thread, setThread] = React.useState([
    genComment(),
    genComment(),
  ]);

  r.onGet('/test/1/thread').reply(200, {
    thread,
  });

  r.onPost('/test/1/thread').reply(({ data }) => {
    const newThread = thread.concat(JSON.parse(data));
    setThread(newThread);

    return [
      201,
      {
        thread: newThread,
      },
    ];
  });

  r.onPatch('/test/1/thread/1').reply(200, {
    thread,
  });
};

const withMockPermissions = (
  Component,
  permissions,
) => () => (
  <AuthContext.Provider
    value={{
      state: {
        permissions,
      },
    }}
  >
    <Component />
  </AuthContext.Provider>
);

export const AsReadOnly = withMockPermissions(
  () => (
    <Mock define={mockRest}>
      <Notes collectionName="test" id="1" />
    </Mock>
  ),
  [genPermission('Read')],
);

export const AsAllPermissions = withMockPermissions(
  () => (
    <Mock define={mockRest}>
      <Notes collectionName="test" id="1" />
    </Mock>
  ),
  [
    genPermission('Read'),
    genPermission('Update'),
    genPermission('Delete'),
    genPermission('Create'),
  ],
);
