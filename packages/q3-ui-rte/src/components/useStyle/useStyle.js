import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  paper: {},
  root: {
    position: 'relative',

    '& .ql-clipboard': {
      display: 'none',
    },

    '& .ql-editor': {
      outline: 0,
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      position: 'relative',
      whiteSpace: 'pre-wrap',
      margin: 'auto',

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.25),
      },

      '& > *': {
        margin: '.75rem !important',
      },

      '& iframe': {
        maxWidth: '100%',
        width: 650,
        height: 550,
        margin: '2rem 0 !important',
        display: 'block',

        [theme.breakpoints.down('md')]: {
          height: 335,
        },
      },

      '& blockquote': {
        padding: '1rem 0 1rem 2rem',
        borderLeft: `1px solid ${theme.palette.primary.main}`,
      },

      '& hr': {
        borderColor: 'var(--background-muted)',
      },

      '& video': {
        maxHeight: 550,
        // padding seems to get in the way
        maxWidth: 'calc(100% - 1.5rem)',
      },

      '& img': {
        cursor: 'pointer',
        display: 'block',
        margin: '2rem 0',
        width: '50%',
        maxWidth: '100%',
        maxHeight: 550,
        objectFit: 'cover',

        [theme.breakpoints.up('md')]: {
          userSelect: 'none',
          '&::selection': {
            backgroundColor: 'transparent',
          },
        },
        [theme.breakpoints.down('sm')]: {
          width: '100% !important',
        },

        '&.ql-full': {
          width: '100%',
        },
        '&.ql-half': {},
        '&.ql-float': {
          float: 'left',
          margin: '0',
          padding: '1rem',
          width: '33%',
        },
      },
    },
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    zIndex: 1,
    padding: theme.spacing(1),
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.25),
    },

    '& .ql-active': {
      backgroundColor: 'var(--background-muted)',
      boxShadow: theme.shadows[1],
      color: theme.palette.primary.main,
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    border: `1px solid ${theme.palette.secondary.main}`,
    userSelect: 'none',
    userDrag: 'none',
  },

  popover: {
    overflowX: 'unset',
    overflowY: 'unset',

    '&::before': {
      content: '""',
      position: 'absolute',
      marginRight: '-0.71em',
      bottom: '99.5%',
      left: '1rem',
      width: 10,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: 'translate(-50%, 50%) rotate(315deg)',
      clipPath:
        'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
    },
  },
}));

export default useStyle;
