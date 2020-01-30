import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const headingFont = {
  color: '#3f3d56',
  fontWeight: 400,
};

const generateShadows = () => {
  const arr = ['none'];
  for (let i = 0; i < 23; i += 1) {
    arr.push(`rgba(0, 0, 0, 0.05) 0px 5px 20px ${i}px`);
  }

  return arr;
};

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[100],
    },
    primary: {
      main: '#1e1434',
    },
    secondary: {
      main: '#3A1540',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    h1: {
      ...headingFont,
      fontSize: 3.8,
      fontWeight: 800,
    },
    h2: {
      ...headingFont,
      marginTop: 8,
      fontSize: 2.4,
    },
    h3: {
      ...headingFont,
      fontSize: 1.7,
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
      fontSize: '0.8rem',
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
    fontFamily: '"Lato", sans-serif',
  },
  shadows: generateShadows(),
  spacing: (factor) => `${0.75 * factor}rem`,
});

Object.assign(theme, {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        img: {
          maxWidth: '100%',
        },
      },
    },
    MuiLink: {
      root: {
        textDecoration: 'none !important',
      },
    },
    MuiDialogTitle: {
      root: {
        paddingBottom: 0,
      },
    },
    MuiToolbar: {
      dense: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiFormControl: {
      root: {
        marginBottom: 4,
        marginTop: 4,
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: grey[200],
        borderRadius: '0 !important',
        '&:hover': {
          backgroundColor: `${grey[100]} !important`,
          transition: 'all 250ms',
        },
        '&:focus-within': {
          backgroundColor: `${grey[100]} !important`,
          borderColor: blue[50],
          boxShadow: '0 0 0 0.12rem rgba(0,123,255,.25)',
        },
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

    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: grey[100],
          transition: 'background-color 250ms',
        },
      },
    },
    MuiTableCell: {
      head: {
        textOverflow: 'ellipsis',
        backgroundColor: '#FFF !important',
        color: grey[700],
        fontSize: '0.75rem !important',
        fontWeight: 600,
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
          display: 'block',
          width: '100% !important',
        },
      },
      root: {
        overflow: 'hidden',
        padding: '4px 8px',
        borderBottom: `2px solid ${grey[100]}`,
        fontSize: '1rem !important',
        [theme.breakpoints.down('md')]: {
          display: 'block',
          '&:not(:last-child)': {
            border: 0,
          },
          '&::before': {
            content: 'attr(data-title)',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginRight: '1rem',
            fontSize: '0.833rem',
          },
        },
      },
      sizeSmall: {
        padding: '6px 0px 6px 24px',
      },
    },
    MuiBottomNavigation: {
      root: {
        height: 105,
      },
    },
    MuiBottomNavigationAction: {
      wrapper: {
        '& svg': {
          height: 45,
          width: 30,
        },
      },
      label: {
        fontSize: '1rem',
      },
    },
    MuiTablePagination: {
      caption: {
        fontSize: '0.88rem',
      },
    },
    MuiStep: {
      horizontal: {
        background: 'transparent',
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
    MuiAutocomplete: {
      popup: { zIndex: 1300 },
    },
    MuiMobileStepper: {
      root: {
        background: '#FFF',
      },
    },
    MuiCheckbox: {
      root: {
        padding: '0 5px',
        marginLeft: 9,
      },
    },
    MuiRadio: {
      root: {
        padding: '0 5px',
        marginLeft: 9,
      },
    },
    MuiFormLabel: {
      root: {
        textTransform: 'initial',
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
});

export default responsiveFontSizes(theme);
