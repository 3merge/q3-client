import { makeStyles } from '@material-ui/core';
import {
  makeSelectedStyle,
  makeSelectedStyleBorder,
} from '../utils';

export default makeStyles((theme) => {
  const ss = makeSelectedStyle(theme, 'applied');
  const sb = makeSelectedStyleBorder(theme, 'applied');

  return {
    listItem: (props) => ({
      borderBottomRightRadius: 16,
      borderTopRightRadius: 16,
      fontSize: '0.911rem',
      '&.Mui-selected': ss(props),
      ...sb(props),

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

    listItemSelected: ss,
    container: ({ state }) => ({
      display: state ? 'block' : 'none',
    }),
  };
});
