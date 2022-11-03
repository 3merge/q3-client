import { makeStyles } from '@material-ui/core';
import { makeSelectedStyle } from '../utils';

export default makeStyles((theme) => {
  const ss = makeSelectedStyle(theme, 'matches');

  return {
    badge: {
      borderRadius: 500,
      display: 'inline-block',
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
      fontSize: theme.typography.caption.fontSize,
      width: '1rem',
      height: '1rem',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    button: (props) => ({
      borderRadius: 0,
      paddingBottom: 6,
      paddingRight: 16,
      paddingTop: 6,
      width: '100%',

      '&.Mui-selected': ss(props),
      '& span': {
        color: 'inherit',
        fontSize: '0.911rem',
      },
      '& svg': {
        opacity: props.matches || props.selected ? 1 : 0.3,
        transition: 'opacity 250ms ease-in',
      },

      '&:hover': {
        '& svg': {
          opacity: 1,
        },
      },
    }),
    selected: ss,
  };
});
