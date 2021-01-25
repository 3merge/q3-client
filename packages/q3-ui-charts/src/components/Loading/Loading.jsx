import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import withColours from '../withColours';

const Loading = withColours(({ colours, title }) => (
  <Box
    bgcolor="background.paper"
    component="figure"
    p={2}
    m={0}
  >
    <Box mb={1}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h2" variant="h4">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="390px"
      width="100%"
    >
      <Box height={0} width={310}>
        <svg viewBox="0 0 311 120" version="1.1">
          <title>Loading visualizations</title>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M0,0 L0,119 L74.6161228,119 L74.6161228,0 L0,0 Z M78.7946257,0 L78.7946257,119 L153.410749,119 L153.410749,0 L78.7946257,0 Z M157.589251,0 L157.589251,119 L232.205374,119 L232.205374,0 L157.589251,0 Z M236.383877,0 L236.383877,119 L311,119 L311,0 L236.383877,0 Z"
              id="Rectangle-1-copy"
            />
            <rect
              fill={colours[0]}
              x="0"
              y="74.618705"
              width="74.6161228"
              height="100%"
            >
              <animate
                attributeName="y"
                from="74.618705"
                to="74.618705"
                begin="0s"
                dur="1.5s"
                values="74.618705; 0; 74.618705; 74.618705; 74.618705"
                keySplines=".75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              fill={colours[1]}
              x="78.7946257"
              y="37"
              width="74.6161228"
              height="100%"
            >
              <animate
                attributeName="y"
                from="37"
                to="37"
                begin="0.1s"
                dur="1.5s"
                values="37; 0; 37; 37; 37"
                keySplines=".75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              fill={colours[2]}
              x="157.589251"
              y="57.3021583"
              width="74.6161228"
              height="100%"
            >
              <animate
                attributeName="y"
                from="57.3021583"
                to="57.3021583"
                begin="0.2s"
                dur="1.5s"
                values="57.3021583; 0; 57.3021583; 57.3021583; 57.3021583"
                keySplines=".75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              fill={colours[3]}
              x="236.383877"
              y="97.3093525"
              width="74.6161228"
              height="100%"
            >
              <animate
                attributeName="y"
                from="97.3093525"
                to="97.3093525"
                begin="0.3s"
                dur="1.5s"
                values="97.3093525; 0; 97.3093525; 97.3093525; 97.3093525"
                keySplines=".75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99; .75 .06 .38 .99"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </svg>
        <Typography textAlign="center" align="center">
          Loading ...
        </Typography>
      </Box>
    </Box>
  </Box>
));

export default Loading;
