import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NestedMenu from './nestedMenu';

export default {
  title: 'Q3 UI/Components/NestedMenu',
};

export const Demo = () => (
  <Location initialPath="/accounts/sups">
    <NestedMenu
      items={[
        {
          label: 'Offers',
          icon: LocalOfferIcon,
          to: '/',
        },
        {
          label: 'Archives',
          icon: DeleteIcon,
          to: '/archives',
        },
        {
          label: 'Accounts',
          icon: DeleteIcon,
          to: '/accounts',
          items: [
            {
              label: 'Supervisors',
              icon: SupervisorAccountIcon,
              to: '/accounts/sups',
            },
          ],
        },
      ]}
    />
    <LocationDebugger />
  </Location>
);
