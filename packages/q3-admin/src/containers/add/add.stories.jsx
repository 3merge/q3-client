/* eslint-disable no-param-reassign */
import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import {
  genAnyPermission,
  coll,
} from '../__fixtures__/permission';
import Add from './add';
import State from '../state';

export default {
  title: 'Q3 Admin/Components/Add',
  parameters: {
    component: Add,
    componentSubtitle:
      'Pre-configured floating-action add button',
  },
};

export const Default = () => (
  <State.Provider
    value={{
      collectionName: coll,
      resourceName: coll,
      resourceNameSingular: coll,
    }}
  >
    <AuthContext.Provider
      value={{
        state: {
          init: true,
          profile: { id: 1 },
          permissions: [genAnyPermission({ op: 'Create' })],
        },
      }}
    >
      <Add>
        <div>Content!</div>
      </Add>
    </AuthContext.Provider>
  </State.Provider>
);
