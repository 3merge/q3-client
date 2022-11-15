import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& [tabIndex="-1"]': {
      maxWidth: '100%',
      width: '400px !important',

      '& > div > div': {
        padding: 0,

        '& > div': {
          paddingTop: '1rem',
        },
      },

      '& [role="tabpanel"]': {
        padding: '0.5rem 0',
      },
    },
  },
}));
