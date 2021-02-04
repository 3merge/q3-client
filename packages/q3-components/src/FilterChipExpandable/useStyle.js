import { makeStyles } from '@material-ui/core/styles';

const isExpanded = (a, b) => (props) =>
  props.isExpanded ? a : b;

const makeSizeStyles = (props) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'opacity 250ms',
  ...props,
});

export default makeStyles(() => ({
  root: {
    visibility: 'hidden',
    height: 0,
    position: 'absolute',
    fontSize: '0.659rem',
    whiteSpace: 'pre',
  },
  long: makeSizeStyles({
    visibility: isExpanded('visible', 'none'),
    opacity: isExpanded('1', '0'),
  }),
  short: makeSizeStyles({
    visibility: isExpanded('none', 'visible'),
    opacity: isExpanded('0', '1'),
  }),
}));
