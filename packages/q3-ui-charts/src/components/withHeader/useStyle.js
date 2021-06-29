import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  const color =
    theme.palette.type === 'dark'
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main;

  return {
    root: ({ legendSize = 0 }) => ({
      [`& .recharts-legend-wrapper li:nth-child(n+${legendSize})`]: {
        display: 'none !important',
      },
      '& .recharts-cartesian-axis-tick, & .recharts-legend-item': {
        color,
        fontSize: 12,
      },
      '& .recharts-cartesian-axis-tick-line[orientation="left"]': {
        display: 'none',
      },
      '& .recharts-cartesian-axis-tick-value': {
        color,
        fill: color,
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
    }),
    right: {
      textAlign: 'right',
    },
    title: {
      color,
      fontWeight: 'bold',
      lineHeight: 'initial',
      margin: 0,
      textTransform: 'none',
    },
  };
});
