import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  actionBar: ({ position = 'sticky' }) => ({
    backgroundColor: '#FFF',
    borderRadius: 0,
    bottom: 0,
    boxShadow: theme.shadows[15],
    left: 0,
    width: '100%',
    maxWidth: '100%',
    zIndex: 100,
    position,

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
  }),
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
