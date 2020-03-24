import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';

import MockLocation from 'q3-ui-test-utils/lib/location';
import IconMenu from './iconMenu';

export default {
  title: 'Q3 UI/Components/IconMenu',
};

export const Default = () => (
  <MockLocation initialPath="/">
    <IconMenu
      items={[
        {
          label: 'First',
          icon: AccountBox,
          visible: true,
          to: '/',
        },
        {
          label: 'Second',
          icon: AccountBox,
          visible: true,
          to: '/second',
        },
        {
          label: 'Third',
          icon: AccountBox,
          visible: true,
          to: '/third',
        },
      ]}
    />
  </MockLocation>
);
