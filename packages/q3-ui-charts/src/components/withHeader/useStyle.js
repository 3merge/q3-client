import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  const color =
    theme.palette.type === 'dark'
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main;

  return {
    root: ({ legendSize = 0 }) => ({
      [`& .recharts-legend-wrapper li:nth-child(n+${legendSize})`]:
        {
          display: 'none !important',
        },
      '& .recharts-cartesian-axis-tick, & .recharts-legend-item':
        {
          color,
          fontSize: 12,
        },
      '& .recharts-cartesian-axis-tick-line[orientation="left"]':
        {
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
      ...theme.typography.h6,
      fontWeight: 'bold',
      marginBottom: '0 !important',
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(0.5),
      position: 'relative',

      '&::before': {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 4,
        content: '""',
        display: 'block',
        height: '100%',
        left: 0,
        position: 'absolute',
        width: '.75rem',
      },
    },
    yTitle: {
      transform: 'translateY(-50%) rotate(180deg)',
      writingMode: 'vertical-lr',
      fontWeight: 'bold',
    },
    xTitle: {
      transform: 'translateX(-50%)',
      fontWeight: 'bold',
    },
  };
});
