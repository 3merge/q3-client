import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  li: {
    margin: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    display: 'block',
    position: 'relative',

    '&:hover,&:focus-within': {
      '& [class*="popover"] ': {
        display: 'block',
      },
    },
  },
  listItem: {
    borderRadius: 4,
    justifyContent: 'center',

    '&:hover svg': {
      opacity: 1,
    },
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`,

    '& svg': {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  listItemIcon: {
    height: 'auto',
    margin: 0,
    width: 'auto',
  },
  icon: {
    color: 'inherit',
    opacity: 0.3,
    transitionDuration: '250ms',
    transitionProperty: 'color,opacity',
    height: theme.typography.h2.fontSize,
    width: theme.typography.h2.fontSize,
  },
  popover: {
    display: 'none',
    boxShadow: theme.shadows[5],
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));
