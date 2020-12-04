import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
  listItem: {
    display: 'block',
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  icon: ({ isExpanded }) => ({
    display: 'block',
    marginLeft:
      typeof isExpanded === 'boolean' ? 0 : '18px',
  }),
  button: ({ isSelected }) => ({
    textTransform: 'none',
    alignItems: 'left',
    backgroundColor: isSelected
      ? palette.grey[300]
      : 'inherit',
  }),
}));
