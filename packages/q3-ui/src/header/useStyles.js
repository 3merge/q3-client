import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  logoSize: {
    maxHeight: 95,
    maxWidth: 165,
  },
  appBar: {
    backgroundColor: (props) =>
      props.transparent ? 'transparent' : '#FFF',
    boxShadow: 'none !important',
    willChange: 'background, color',
    transition: 'all 225ms !important',
  },
  appBarPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0.5rem',
    },
  },
  spacing: {
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  bottomBorder: {
    borderBottom: `2px solid ${grey[200]}`,
  },
  logo: ({
    desktopHeight = 95,
    desktopWidth = 165,
    tabletHeight = 75,
    tabletWidth = 145,
    mobileHeight = 75,
    mobileWidth = 115,
  }) => ({
    border: '2px solid transparent',
    boxSizing: 'border-box',
    padding: 0,
    display: 'block',
    maxHeight: desktopHeight,
    marginRight: theme.spacing(2),
    maxWidth: desktopWidth,
    width: 'auto',
    '&:focus': {
      outline: 1,
      borderRadius: 3,
      fontWeight: 800,
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: tabletHeight,
      maxWidth: tabletWidth,
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: mobileHeight,
      maxWidth: mobileWidth,
      marginRight: theme.spacing(1),
    },
    '& img': {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
    },
  }),
  withDividers: {
    '&>:not(:last-child)': {
      marginRight: '2rem',
      position: 'relative',
      padding: '0 2rem 0 0',
      '&::after': {
        backgroundColor: grey[200],
        content: "''",
        display: 'block',
        height: 200,
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 2,
      },
    },
  },
  withoutDividers: {
    '&>*': {
      position: 'relative',
      padding: '0 1rem',
      [theme.breakpoints.down('sm')]: {
        '&:not(:last-child)': {
          paddingRight: 0,
        },
      },
    },
  },
  listContainer: {
    padding: theme.spacing(3),
  },
  list: {
    width: 230,
  },
}));
