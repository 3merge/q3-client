import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export default makeStyles((theme) => {
  const index = theme.palette.type === 'dark' ? 50 : 400;

  return {
    value: {
      whiteSpace: 'nowrap',
      fontSize: theme.typography.h1.fontSize,
    },
    unit: {
      fontSize: theme.typography.caption.fontSize,
    },
    deviation: {
      fontSize: theme.typography.caption.fontSize,
      marginBottom: theme.spacing(1.5),
      lineHeight: 1,
      whiteSpace: 'nowrap',

      '&.hidden': {
        visibility: 'hidden',
      },
      '&.positive': {
        color: green[index],
        '&:before': {
          'content': '"▲"',
          marginRight: theme.spacing(0.25),
        },
      },
      '&.negative': {
        color: red[index],
        '&:before': {
          'content': '"▼"',
          marginRight: theme.spacing(0.25),
        },
      },
    },
  };
});
