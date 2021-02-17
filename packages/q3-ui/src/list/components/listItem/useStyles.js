import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(({ palette }) => ({
  listItemText: ({ liteItemTextColor }) => ({
    color: liteItemTextColor || palette.primary.dark,
  }),
}));
