import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

const float = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

export default makeStyles((theme) => ({
  btnPrev: {
    ...float,
    left: `-${theme.spacing(3)}`,
  },
  btnNext: {
    ...float,
    right: `-${theme.spacing(3)}`,
  },
  root: {
    position: 'relative',
  },
  thumbs: {
    overflow: 'hidden',
    '& .swiper-slide': {},
    '& .swiper-slide-active': {
      '&> div': {
        borderColor: blue[500],
        opacity: 1,
      },
    },
  },
  thumb: {
    border: '2px solid transparent',
    borderRadius: 5,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    height: 75,
    marginTop: theme.spacing(1),
    opacity: 0.5,
    overflow: 'hidden',
    position: 'relative',
    transitionDuration: '500ms',
    transitionProperty: 'border,opacity',
    width: 74,

    '&> img': {
      position: 'relative',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
}));
