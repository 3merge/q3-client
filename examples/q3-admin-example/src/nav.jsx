import React from 'react';
import Menu from 'q3-ui/lib/menu';
import { useAuth } from 'q3-ui-permissions';
import { PERMISSION_COLLECTION } from './constants';

export default () => (
  <Menu
    title="Presets"
    items={[
      {
        visible: useAuth(PERMISSION_COLLECTION).canSee,
        label: 'Permissions',
        to: '/permissions',
      },
    ]}
  />
);
