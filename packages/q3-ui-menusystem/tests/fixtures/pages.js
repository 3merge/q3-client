import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import AppleIcon from '@material-ui/icons/Apple';
import BallotIcon from '@material-ui/icons/Ballot';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ColorizeIcon from '@material-ui/icons/Colorize';
import FastfoodIcon from '@material-ui/icons/Fastfood';

export default [
  {
    label: 'home',
    icon: AppleIcon,
    href: '/app/dashboard',
  },
  {
    label: 'businesses',
    icon: AccountBalanceIcon,
    pages: [
      {
        label: 'restaurants',
        icon: FastfoodIcon,
        href: '/app/restaurants',
        pages: [
          {
            label: 'Top-rated',
            icon: ChatBubbleOutlineIcon,
            href: '/app/restaurants?rating=top',
          },
        ],
      },
      {
        label: 'flights',
        icon: AirlineSeatFlatAngledIcon,
        href: '/app/flights',
      },
      {
        label: 'medical',
        icon: ColorizeIcon,
        href: '/app/medical',
      },
      {
        label: 'government',
        icon: BallotIcon,
        href: '/government',
        pages: [
          {
            label: 'Top-rated',
            icon: ChatBubbleOutlineIcon,
            href: '/app/restaurants?rating=top',
          },
          {
            label: 'Top-rated',
            icon: ChatBubbleOutlineIcon,
            href: '/app/restaurants?rating=top',
          },
          {
            label: 'Top-rated',
            icon: ChatBubbleOutlineIcon,
            href: '/app/restaurants?rating=top',
          },
        ],
      },
    ],
  },
  {
    label: 'travel',
    icon: BusinessCenterIcon,
    pages: [
      {
        label: 'flights',
        icon: AirlineSeatFlatAngledIcon,
        href: '/app/flights',
      },
      {
        label: 'medical',
        icon: ColorizeIcon,
        href: '/app/medical',
      },
    ],
  },
];
