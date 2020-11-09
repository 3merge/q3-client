import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import MapIcon from '@material-ui/icons/Map';
import MessageIcon from '@material-ui/icons/Message';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';

const menuItems = [
  {
    label: 'Home',
    icon: DashboardIcon,
    to: '/',
  },
  {
    label: 'Accounts',
    icon: AccountTreeIcon,
    nestedMenuItems: [
      {
        label: 'Chequing',
        to: '/chequing',
      },
      {
        label: 'Savings',
        to: '/savings',
        visible: true,
      },
    ],
  },
  {
    label: 'Accommodations',
    icon: AirlineSeatFlatAngledIcon,
    nestedMenuItems: [
      {
        label: 'Hotels',
        to: '/hotels',
        visible: true,
      },
      {
        label: 'AirBnB and time-sharing properties',
        to: '/airbnb',
      },
      {
        label: 'Motels and Inns',
        to: '/motels',
      },
    ],
  },
];

export const extendedMenuItems = menuItems.concat([
  {
    label: 'Messages',
    icon: MessageIcon,
    to: '/messages',
  },
  {
    label: 'Locations',
    icon: MapIcon,
    nestedMenuItems: [
      {
        label: 'Per Region',
        nestedMenuItems: [
          {
            label: 'Per City',
            to: '/city',
            visible: true,
          },
          {
            label: 'Per Municipality',
            to: '/municipality',
            visible: true,
          },
        ],
      },
      {
        label: 'Per Province',
        to: '/province',
      },
    ],
  },
  {
    label: 'Misc',
    icon: SurroundSoundIcon,
    to: '/misc',
  },
]);

export default menuItems;
