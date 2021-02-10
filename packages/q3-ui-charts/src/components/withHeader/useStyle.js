import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .recharts-cartesian-axis-tick, & .recharts-legend-item': {
      color: theme?.palette?.primary?.dark,
      fontSize: 12,
    },
    '& .recharts-cartesian-axis-tick-line[orientation="left"]': {
      display: 'none',
    },
    '& .recharts-cartesian-axis-line': {
      stroke: theme?.palette?.primary?.dark,
    },
    '& .recharts-cartesian-grid': {
      opacity: '0',
      transition: 'opacity 250ms',
    },
    '&:hover .recharts-cartesian-grid': {
      opacity: '1',
    },
  },
}));
