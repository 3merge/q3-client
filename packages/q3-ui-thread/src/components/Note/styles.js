import { makeStyles } from '@material-ui/core';

export const useHeaderStyle = makeStyles((theme) => ({
  subheader: {
    color: 'inherit',
    fontWeight: 'bold',
    lineHeight: 1.1,
    marginTop: theme.spacing(0.5),
  },
  title: {
    color: 'inherit',
    fontSize: theme.typography.overline.fontSize,
    fontWeight: 'normal',
    opacity: 0.8,
  },
  root: {
    '& ~ div': {
      paddingTop: 0,
    },
  },
}));

export const useCardStyle = makeStyles((theme) => ({
  root: () => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    marginBottom: theme.spacing(0.5),
    width: '100%',

    '&:hover,&:focus': {
      boxShadow: 'none',
      transform: 'none',
    },
  }),
}));
