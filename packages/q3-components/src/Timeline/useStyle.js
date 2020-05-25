import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',

    '&::after': {
      content: '""',
      display: 'block',
      width: 2,
      borderLeft: `2px dotted ${colors.blueGrey[200]}`,
      left: 17,
      position: 'absolute',
      top: 0,
      height: '100%',
    },
  },
  item: ({ color }) => ({
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
    padding: theme.spacing(1),
    zIndex: 1,

    '&:before': {
      content: '""',
      display: 'block',
      width: 13,
      height: 13,
      backgroundColor: get(colors, `${color}.500`),
      borderRadius: '50%',
      boxShadow: `0 0 0 3px ${get(colors, `${color}.100`)}`,
      marginTop: theme.spacing(0.35),
    },

    '&>div': {
      paddingLeft: 15,
      width: '100%',
    },
  }),
}));
