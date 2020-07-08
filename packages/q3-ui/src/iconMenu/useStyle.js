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
      color: theme.palette.primary.main,
      transform: 'scale(1.2) !important',
    },
  },
  baseLink: {
    fontSize: '0.833rem',
    fontWeight: '200',
    marginBottom: '0.75vh',
    textDecoration: 'none',

    '& .nav-link-icon': {
      background: 'transparent',
      color: theme.palette.secondary.main,
      transform: 'scale(0.9)',
      transitionProperty:
        'background, border, color,transform',
      transitionDuration: '500ms',
    },

    '&:hover .nav-link-icon': {
      background: theme.palette.secondary.main,
      color: '#FFF !important',
      transform: 'scale(1)',
    },
  },

  tooltip: {
    fontSize: 25,
  },
}));
