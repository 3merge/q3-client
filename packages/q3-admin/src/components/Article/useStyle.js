import { makeStyles } from '@material-ui/core/styles';

const hasAside = (l, r) => (props) =>
  props.hasAside ? l : r;

const getBackgroundColor = (theme) =>
  hasAside(
    theme.palette.background.paper,
    theme.palette.background.default,
  );

export default makeStyles((theme) => {
  const backgroundColor = getBackgroundColor(theme);

  return {
    view: {
      backgroundColor,
      // position: 'relative',
      margin: '0 auto',
      maxWidth: '100%',
      width: hasAside('100%', 1440),
      zIndex: 1,

      '& > div': {
        backgroundColor,
        padding: hasAside(undefined, theme.spacing(0.5)),
      },

      [theme.breakpoints.down('md')]: {
        border: 'none',
        paddingTop: theme.spacing(1),
      },
    },
    articleWrapper: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    section: {
      backgroundColor,
    },
  };
});
