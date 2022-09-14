import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  const backgroundColor = theme.palette.background.paper;

  return {
    actions: {
      backgroundColor,
      textAlign: 'right',
      width: 'auto',
    },
    checkbox: {
      backgroundColor,
      textAlign: 'left',
      width: 39,
    },
    foot: {
      backgroundColor,
      bottom: 0,
      padding: `${theme.spacing(0.5)} 0`,
      position: 'sticky',

      '& ul': {
        justifyContent: 'center',
      },
    },
    head: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    root: {
      overflow: 'auto',
      height: '100%',
      width: '100%',
    },
    row: {
      borderTop: `2px solid ${theme.palette.background.default}`,
    },
    table: {
      borderCollapse: 'collapse',
      height: '100%',
      tableLayout: 'fixed',
      width: '100%',
    },
  };
});
