import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  subheader: {
    fontWeight: 'bold',
    lineHeight: 1,
  },
  small: {
    marginLeft: '.25rem',
  },
  icon: ({ color }) => ({
    display: 'inline-flex',
    borderRadius: 500,
    position: 'relative',
    overflow: 'hidden',
    color,
  }),
  iconBg: ({ color }) => ({
    backgroundColor: color,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.15,
  }),
}));
