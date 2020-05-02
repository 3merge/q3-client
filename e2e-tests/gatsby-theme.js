const { grey } = require('@material-ui/core/colors');

const main = '#AC132C';

module.exports = {
  palette: {
    primary: {
      dark: '#96373b',
      main,
      light: 'rgb(234, 82, 92)',
    },
    secondary: {
      dark: '#96373b',
      main: '#181717',
    },
  },
  typography: {
    h2: {
      '&.underline::after': {
        backgroundColor: main,
        borderRadius: 2,
        content: '""',
        display: 'block',
        height: 5,
        marginBottom: '2rem',
        fontSize: '2.4rem',
        marginTop: '1rem',
        width: 55,
      },
    },
    overline: {
      fontSize: '1rem',
    },
  },
  overrides: {
    MuiListSubheader: {
      sticky: {
        fontSize: '1rem',
        lineHeight: 1,
        padding: 0,
      },
    },
    MuiAvatar: {
      rounded: {
        backgroundColor: '#FFF',
      },
    },
    MuiMobileStepper: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiCard: {
      root: {
        border: `1px solid ${grey[200]}`,
        height: '100%',
      },
    },
    MuiCardHeader: {
      root: {
        color: main,
      },
    },
    MuiSlider: {
      markLabel: {
        fontSize: '0.7rem !important',
      },
    },
    PrivateValueLabel: {
      label: {
        fontSize: '0.5rem',
      },
    },
    MuiInputBase: {
      root: {
        marginBottom: '0 !important',
      },
    },
    MuiTable: {
      root: {
        '& caption': {
          fontSize: '0.7rem !important',
          textAlign: 'right',
          fontStyle: 'italic',
          padding: '0.25rem',
          margin: 0,
        },
      },
    },
    MuiTableCell: {
      body: {
        fontSize: '0.833rem',
      },
    },
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: 'normal !important',
        },
      },
    },
  },
};
