import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .recharts-legend-wrapper': {
      position: 'relative !important',
      bottom: 'calc(100% + 24px) !important',
      left: 'auto !important',
      right: '0 !important',
      fontSize: 12,
    },
    '& .recharts-cartesian-axis-tick, & .recharts-legend-item': {
      color: theme?.palette?.primary?.dark,
      fontSize: 12,
    },
    '& .recharts-cartesian-axis-tick-line[orientation="left"]': {
      display: 'none',
    },

    '& .recharts-tooltip-cursor': {
      opacity: 0.2,
      stroke: theme.palette.primary.dark,
      strokeWidth: 2,
    },

    '& .recharts-cartesian-grid': {
      opacity: 0.3,

      '& line': {
        stroke: theme.palette.secondary.dark,
      },
    },
  },
  right: {
    textAlign: 'right',
  },
}));
