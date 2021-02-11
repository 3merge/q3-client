import { makeStyles } from '@material-ui/core/styles';

const getIsEditableProps = ({ isEditable }) => ({
  cursor: isEditable ? 'pointer' : 'not-allowed',
  fontSize: '0.833rem',
  textTransform: 'none',
});

export default makeStyles((theme) => ({
  field: getIsEditableProps,
  fieldIcon: {
    color: '#8792a1',
    marginLeft: theme.spacing(0.75),
    opacity: 0.75,
    transition: 'opacity 250ms ease-in',
    '&:hover ': {
      opacity: 1,
    },
  },
  icon: {
    fontSize: '1.25rem',
  },
  iconBar: {
    position: 'absolute',
    right: 0,
    top: '100%',
  },
}));
