import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const color = '#1f2026';

const headingFont = {
  // color: '#242a31',
  fontWeight: 400,
  fontFamily: '"Source Sans Pro", sans-serif',
  lineHeight: 1.1,
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
      dark: '#184A42',
      main: '#329686',
      light: '#4BE3CA',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    h1: {
      ...headingFont,
      fontSize: '2.558rem',
      fontWeight: 600,
    },
    h2: {
      ...headingFont,
      marginTop: 8,
      fontSize: '2.076rem',
    },
    h3: {
      ...headingFont,
      fontSize: '1.87rem',
    },
    h4: {
      ...headingFont,
      fontSize: '1.685rem',
    },
    h5: {
      ...headingFont,
      fontSize: '1.518rem',
    },
    h6: {
      ...headingFont,
      fontSize: '1.368rem',
    },
    overline: {
      color: '#4d555e',
      fontWeight: 400,
      fontSize: '0.812rem !important',
    },
    body1: {
      color: '#4f5868',
      '&:not(:last-child)': {
        marginBottom: '1rem',
      },
    },
    body2: {
      fontSize: '1.232rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '1.232rem',
    },
    subtitle1: {
      color: '#4f5868',
      fontSize: '1.11rem',
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
          backgroundColor: '#F5F7F9',
          fontSize: 'initial !important',
          color,
        },
        html: {
          fontSize: 'initial !important',
          color,
        },
        img: {
          maxWidth: '100%',
        },
        small: {
          fontSize: '0.812rem',
        },
      },
    },
    MuiAlert: {
      root: {
        fontSize: '0.901rem !important',
      },
    },
    MuiLink: {
      root: {
        textDecoration: 'underline !important',
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
    MuiSwitch: {
      colorSecondary: {
        '&.Mui-disabled': {
          color: '#DDD',
        },
      },
    },
    MuiButtonGroup: {
      groupedContainedHorizontal: {
        '&:not(:last-child)': {
          border: '0 !Important',
        },
        '&:last-child': {
          padding: '0 !Important',
        },
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
    MuiTable: {
      borderColor: '#F5F7F9',
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
        padding: '0 8px',
        borderBottom: '2px solid #F5F7F9',
        fontSize: '0.901rem !important',
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
        fontSize: '0.901rem',
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
        fontSize: '1rem',
      },
      secondary: {
        fontSize: '0.901rem',
      },
    },
    MuiListItemSecondaryAction: {
      /* root: {
        [theme.breakpoints.down('md')]: {
          position: 'relative',
          right: 'auto',
          top: 'auto',
          transform: 'none',
        },
      }, */
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

    MuiChip: {
      labelSmall: {
        fontSize: '0.659rem',
      },
    },

    MuiTab: {
      root: {
        textTransform: 'none',
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
