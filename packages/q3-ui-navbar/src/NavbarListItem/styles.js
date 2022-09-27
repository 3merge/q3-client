import { makeStyles } from '@material-ui/core';
import { makeSelectedStyle } from '../utils';

export default makeStyles((theme) => {
  const ss = makeSelectedStyle(theme, 'matches');

  return {
    button: (props) => ({
      borderRadius: 4,
      paddingBottom: 4,
      paddingRight: 16,
      paddingTop: 4,
      width: '100%',

      '&.Mui-selected': ss(props),
      '& span': {
        color: 'inherit',
        fontSize: '0.911rem',
      },
      '& svg': {
        opacity: props.matches || props.state ? 1 : 0.3,
        transition: 'opacity 250ms ease-in',
      },

      '&:hover': {
        '& svg': {
          opacity: 1,
        },
      },
    }),
    selected: ss,
    container: {
      padding: '0 0 0 24px',
    },
  };
});
