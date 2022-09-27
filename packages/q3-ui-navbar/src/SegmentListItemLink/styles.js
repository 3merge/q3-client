import { makeStyles } from '@material-ui/core';
import { makeSelectedStyleBorder } from '../utils';

export default makeStyles((theme) => ({
  link: ({ applied }) => ({
    color: applied
      ? theme.palette.secondary.main
      : 'inherit',
    fontSize: '0.911rem',
    position: 'inherit',

    '&:hover': {
      backgroundColor: 'transparent',
    },

    ...makeSelectedStyleBorder(
      theme,
      'applied',
    )({
      applied,
    }),
  }),
}));
