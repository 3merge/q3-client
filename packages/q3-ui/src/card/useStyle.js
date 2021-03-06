import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  iconCls: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    height: 210,
  },
  negativeMargin: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    display: 'block',
    marginLeft: `-${theme.spacing(3)}`,
    width: `calc(100% + ${theme.spacing(4)})`,
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: '150%',
    position: 'relative',
    height: 0,
    '& img': {
      mixBlendMode: 'screen',
      position: 'absolute',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    [theme.breakpoints.down('xs')]: {
      margin: '16px auto -16px',
      paddingTop: 0,
      height: 130,
      width: 'calc(100% - 32px)',
    },
  },
  iconHead: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2.5),
    position: 'relative',
  },
  iconThumb: ({ imgObjectFit, square }) => ({
    borderRadius: square ? 5 : '50%',
    left: theme.spacing(1.5),
    height: 70,
    position: 'absolute',
    top: 'calc(100% - 35px)',
    width: 70,
    '& img': {
      objectFit: imgObjectFit,
    },
  }),
  iconBody: {
    padding: `${theme.spacing(3)} ${theme.spacing(2)} 0`,
  },
  iconText: {
    color: blueGrey[200],
    lineHeight: 0,
  },
  spacing: {
    marginLeft: theme.spacing(1),
  },
  root: {
    display: 'block',
    overflow: 'visible',
    textDecoration: 'none',
    position: 'relative',
    height: '100%',
  },
  ribbon: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    fontSize: '0.75rem',
    padding: '0.25rem 1rem',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    textTransform: 'uppercase',
    '&::before,&::after': {
      content: "''",
      position: 'absolute',
      width: 0,
      height: 0,
      left: '100%',
      borderRight: '10px solid transparent',
    },
    '&::before': {
      borderBottom: '20px solid transparent',
      borderLeft: `10px solid ${theme.palette.primary.main}`,
      top: 0,
    },
    '&::after': {
      borderTop: '20px solid transparent',
      borderBottom: `20px solid ${theme.palette.primary.main}`,
      bottom: 0,
    },
  },
  imgCover: ({ imgObjectFit }) => ({
    position: 'relative',
    height: 265,
    width: '100%',
    '&> img': {
      height: '100%',
      objectFit: imgObjectFit,
      width: '100%',
    },
  }),
}));
