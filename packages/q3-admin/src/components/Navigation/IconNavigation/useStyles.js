import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
  iconList: {
    backgroundColor: palette.background.paper,
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    '& svg': {
      width: '100%',
      height: '100%',
      fill: palette.text.primary,
    },
  },
  span: {
    '$ .MuiButton-label': {
      textAlign: 'left',
    },
  },
  popper: {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
    fontSize: '12px',
  },
}));
