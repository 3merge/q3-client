const menuItems = [
  {
    label: 'Home',
    visible: true,
    to: '/',
  },
  {
    label: 'Accounts',
    visible: true,
    nestedMenuItems: [
      {
        label: 'Chequing',
        to: '/chequing',
        visible: true,
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
    visible: true,
    nestedMenuItems: [
      {
        label: 'Hotels',
        to: '/hotels',
        visible: true,
      },
      {
        label: 'AirBnB and time-sharing properties',
        to: '/airbnb',
        visible: true,
      },
      {
        label: 'Motels and Inns',
        to: '/motels',
        visible: true,
      },
    ],
  },
];

export const extendedMenuItems = menuItems.concat([
  {
    label: 'Messages',
    to: '/messages',
    visible: true,
  },
  {
    label: 'Locations',
    visible: true,
    nestedMenuItems: [
      {
        label: 'Per Region',
        visible: true,
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
        visible: true,
      },
    ],
  },
  {
    label: 'Misc',
    visible: true,
    to: '/misc',
  },
]);

export default menuItems;
