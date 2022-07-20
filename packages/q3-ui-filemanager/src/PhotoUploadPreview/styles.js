import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    display: 'inline-block',
    height: 'auto',
    marginBottom: theme.spacing(2),
    maxWidth: '100%',
    width: '280px',
  },
  root: ({ readOnly }) => ({
    backgroundColor: theme.palette.secondary.light,
    border: '2px dashed',
    borderColor: theme.palette.background.muted,
    borderRadius: 8,
    height: '280px',
    position: 'relative',
    transition: 'border 250ms',
    width: '100%',
    outline: '0 !important',
    color: theme.palette.primary.main,
    padding: theme.spacing(0.25),

    '& > svg:first-of-type': {
      objectFit: 'contain',
      objectPosition: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: 0,
      opacity: 0.45,
      top: 0,
      transition: 'opacity,transform 550ms',
    },

    '& .hover': {
      opacity: 0,
      transition: 'opacity 350ms',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: 5,
    },

    ...(!readOnly
      ? {
          '&:hover,&:focus,&:focus-within': {
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,

            '& > svg:first-of-type': {
              opacity: 1,
            },

            '& .hover': {
              opacity: 1,
            },
          },
        }
      : {
          '& > svg:first-of-type': {
            opacity: 1,
          },
        }),
  }),
  button: {
    display: 'none',
  },
  preview: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    zIndex: 2,
    position: 'relative',
  },
  dnd: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 3,
    top: 0,
  },
}));
