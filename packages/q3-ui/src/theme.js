import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import mont from './static/Montserrat-SemiBold.ttf';
import play from './static/PlayfairDisplay-Bold.ttf';

const Montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Montserrat'),
    local('Montserrat-Regular'),
    url(${mont}) format('ttf')
  `,
};

const PlayfairDisplay = {
  fontFamily: 'PlayfairDisplay',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('PlayfairDisplay'),
    local('PlayfairDisplay-Regular'),
    url(${play}) format('ttf')
  `,
};

const headingFont = {
  color: '#3f3d56',
  fontFamily: '"PlayfairDisplay", serif',
  fontWeight: 400,
};

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      background: {
        default: grey[200],
      },
    },
    status: {
      danger: 'orange',
    },
    typography: {
      h1: {
        ...headingFont,
        fontSize: 3.3,
        fontWeight: 800,
      },
      h2: {
        ...headingFont,
        marginTop: 8,
        fontSize: 2.6,
      },
      h3: {
        ...headingFont,
        fontSize: 2,
      },
      h4: {
        ...headingFont,
        fontSize: 1.4,
      },
      h5: {
        ...headingFont,
        fontSize: 1.15,
      },
      h6: {
        ...headingFont,
        fontSize: 0.8,
      },
      overline: {
        fontWeight: 600,
      },
      body1: {
        color: grey[700],
        '&:not(:last-child)': {
          marginBottom: '1rem',
        },
      },
      body2: {
        fontSize: 1.15,
        fontWeight: 400,
      },
      subtitle1: {
        color: grey[700],
        fontSize: 1.15,
        fontWeight: 600,
      },
      fontFamily: `
        'Montserrat',
        'Segoe UI',
        'Helvetica Neue',
        sans-serif
      `,
    },
    shadows: [
      'rgba(0, 0, 0, 0.05) 0px 3px 5px 0px',
      'rgba(0, 0, 0, 0.07) 0px 5px 14px 2px',
      '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    ],
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [Montserrat, PlayfairDisplay],
          img: {
            maxWidth: '100%',
          },
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
      MuiCard: {
        root: {
          transitionDuration: '500ms',
          transitionProperty: 'transform, box-shadow',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow:
              '0 16px 70px -12.125px rgba(0,0,0,0.3)',
          },
          MuiButton: {
            contained: {
              boxShadow: 'none',
            },
          },
        },
      },
    },
  }),
);
