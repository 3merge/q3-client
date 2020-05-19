import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  actionBar: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    bottom: theme.spacing(2),
    boxShadow: theme.shadows[15],
    left: '50%',
    maxWidth: '100%',
    transform: 'translateX(-50%)',
    width: '85vw',
    position: 'fixed',
    zIndex: 1000000,

    '&>span': {
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      display: 'inline-flex',
      width: 168,

      '&>button': {
        padding: 0,
        height: '100%',
      },
    },
  },
}));

export const ExcelWorkspaceHeaderCellStyles = {
  width: {
    wpx: 160,
  },
  style: {
    font: {
      bold: true,
    },
    fill: {
      patternType: 'solid',
      bgColor: { theme: '1' },
    },

    border: {
      bottom: {
        style: 'thin',
        color: {
          theme: '1',
          tint: '-0.25',
        },
      },
    },
  },
};
