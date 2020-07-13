import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .swiper-button-next': {
      color: theme.palette.secondary.main,
    },
    '& .swiper-button-prev': {
      color: theme.palette.secondary.main,
    },
    '& .swiper-pagination-bullet': {
      background: theme.palette.secondary.main,
    },
  },
  trigger: ({ marginBottom }) => ({
    cursor: 'pointer',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom,
  }),
}));
