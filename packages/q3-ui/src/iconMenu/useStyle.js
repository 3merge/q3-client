import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  subItemCls: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    padding: '0 1rem',
    '&:hover': {
      opacity: '1 !important',
      textDecoration: 'underline',
    },
  },
  container: {
    padding: '0 16px',
    position: 'relative',
    '&>a': {
      borderRadius: 2,
      transition: 'background-color 250ms',
    },
  },
  selected: {},
  activeLink: {
    '& .nav-link-icon': {
      color: `${theme.palette.secondary.main} !important`,
    },
  },
  baseLink: {
    fontSize: '0.833rem',
    fontWeight: '200',
    marginBottom: theme.spacing(1),
    textDecoration: 'none',

    '& .nav-link-icon': {
      background: 'transparent',
      color: 'rgba(255,255,255,0.67)',
      height: 45,
      width: 45,
      transitionProperty: 'background, border, color',
      transitionDuration: '500ms',

      '& svg': {
        height: '1.15em',
        width: '1.15em',
      },
    },

    '&:hover .nav-link-icon': {
      background: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.85)',
    },
  },

  tooltip: {
    fontSize: 25,
  },
}));
