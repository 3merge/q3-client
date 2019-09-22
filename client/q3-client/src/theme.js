import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import src from './static/Montserrat-Regular.ttf';

const Montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Montserrat'),
    local('Montserrat-Regular'),
    url(${src}) format('ttf')
  `,
};

export default ({
  primary = '#61a584',
  secondary = '#1e1434',
}) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        background: {
          default: grey[200],
        },
        primary: {
          main: primary,
        },
        secondary: {
          main: secondary,
        },
      },
      status: {
        danger: 'orange',
      },
      typography: {
        h1: {
          fontSize: 2,
          fontWeight: 600,
          marginTop: 8,
        },
        h2: {
          fontSize: 1.25,
          fontWeight: 'bold',
        },
        h3: {
          fontSize: 1.1,
        },
        subtitle2: {
          marginTop: '0.5rem',
        },
        fontFamily: `
        Montserrat,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif
      `,
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [Montserrat],
          },
        },
        MuiListItemIcon: {
          root: {
            minWidth: 32,
          },
        },
        MuiFilledInput: {
          root: {
            backgroundColor: grey[100],
          },
        },
        MuiButton: {
          root: {
            '&.Mui-selected': {
              textDecoration: 'underline',
            },
          },
          contained: {
            boxShadow: 'none',
          },
        },
        MuiBadge: {
          root: {
            '&:not(:first-of-type)': {
              marginLeft: -8,
            },
          },
          badge: {
            background: '#fff',
            height: 16,
            fontSize: 10,
            minWidth: 16,
            top: 'calc(100% - 6px)',
            right: 'calc(100% - 6px)',
          },
        },
        MuiBreadcrumbs: {
          ol: {
            '&:first-child': {
              lineHeight: 0,
            },
          },
          separator: {
            fontSize: 8,
          },
        },
      },
    }),
  );
