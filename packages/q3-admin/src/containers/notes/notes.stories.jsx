import React from 'react';
import { genPermission } from '../__fixtures__/permission';
import MockThreadEndpoint from './__support__/rest';
import withMockPermissions from './__support__/withPermissions';
import Notes from '.';

export default {
  title: 'Q3 Admin|Containers/Notes',
  parameters: {
    component: Notes,
    componentSubtitle: 'Comment threading',
  },
};

export const AsReadOnly = withMockPermissions(
  () => (
    <MockThreadEndpoint>
      <Notes collectionName="storybook" id="1" />
    </MockThreadEndpoint>
  ),
  [genPermission('Read')],
);

export const AsAllPermissions = withMockPermissions(
  () => (
    <MockThreadEndpoint>
      <Notes collectionName="storybook" id="1" />
    </MockThreadEndpoint>
  ),
  [
    genPermission('Read'),
    genPermission('Update'),
    genPermission('Delete'),
    genPermission('Create'),
  ],
);
