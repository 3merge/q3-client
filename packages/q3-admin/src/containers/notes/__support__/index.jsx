import React from 'react';
import { genPermission } from '../../__fixtures__/permission';
import MockThreadEndpoint from './rest';
import withMockPermissions from './withPermissions';
import Notes from '..';
import { Definitions } from '../../state';

export const ReadOnly = withMockPermissions(
  () => (
    <Definitions.Provider
      value={{ collectionName: 'storybook', id: 1 }}
    >
      <MockThreadEndpoint>
        <Notes />
      </MockThreadEndpoint>
    </Definitions.Provider>
  ),
  [genPermission('Read')],
);

export const FullEditing = withMockPermissions(
  () => (
    <Definitions.Provider
      value={{ collectionName: 'storybook', id: 1 }}
    >
      <MockThreadEndpoint>
        <Notes />
      </MockThreadEndpoint>{' '}
    </Definitions.Provider>
  ),
  [
    genPermission('Read'),
    genPermission('Update'),
    genPermission('Delete'),
    genPermission('Create'),
  ],
);
