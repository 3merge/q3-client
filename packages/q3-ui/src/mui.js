import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const color = '#1f2026';

const headingFont = {
  color: '#242a31',
  fontWeight: 400,
  fontFamily: '"Source Sans Pro", sans-serif',
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
      fontSize: '2.887rem',
      fontWeight: 600,
    },
    h2: {
      ...headingFont,
      marginTop: 8,
      fontSize: '2.281rem',
    },
    h3: {
      ...headingFont,
      fontSize: '1.802rem',
    },
    h4: {
      ...headingFont,
      fontSize: '1.602rem',
    },
    h5: {
      ...headingFont,
      fontSize: '1.266rem',
    },
    h6: {
      ...headingFont,
      fontSize: '0.889rem',
    },
    overline: {
      color: '#4d555e',
      fontWeight: 400,
      lineHeight: 1.35,
    },
    body1: {
      color: '#687285',
      '&:not(:last-child)': {
        marginBottom: '1rem',
      },
    },
    body2: {
      fontSize: '1.15rem',
      fontWeight: 400,
    },
    subtitle1: {
      color: '#687285',
      fontSize: '1.15rem',
      fontWeight: 600,
    },
    fontFamily: '"Roboto", sans-serif',
  },
  shadows: generateShadows(),
  spacing: (factor) => `${0.75 * factor}rem`,
});

Object.assign(theme, {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          color,
        },
        html: {
          color,
        },
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
    MuiPaper: {
      root: {
        color,
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
    MuiSnackbarContent: {
      root: {
        width: 300,
        minWidth: '300px !important',
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
    MuiInputBase: {
      root: {
        marginBottom: 0,
        '&:not(:last-child)': {
          marginBottom: 0,
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
      },
      root: {
        overflow: 'hidden',
        padding: '4px 8px',
        borderBottom: `2px solid ${grey[100]}`,
        fontSize: '1rem !important',
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
      spacer: {
        display: 'none',
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
    MuiListItemText: {
      root: {
        // maxWidth: '55% !important',
        [theme.breakpoints.down('md')]: {
          // maxWidth: '100% !important',
        },
      },
      primary: {
        fontSize: '1.125em',
      },
      secondary: {
        fontSize: '1em',
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        [theme.breakpoints.down('md')]: {
          position: 'relative',
          right: 'auto',
          top: 'auto',
          transform: 'none',
        },
      },
    },
    MuiExpansionPanel: {
      root: {
        '&.Mui-disabled': {
          backgroundColor: '#FFF',
        },
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        '&.Mui-disabled': {
          opacity: 1,
        },
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
