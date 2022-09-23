import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  wrapper: ({ isOpen }) => ({
    border: isOpen
      ? `1px solid ${theme.palette.secondary.main}`
      : 'transparent',
    borderRadius: 4,
    transition: 'border 150ms',
  }),
}));
