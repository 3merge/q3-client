import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FigureWrapper from '../FigureWrapper';

const Figure = ({
  captionComponent,
  children,
  title,
  ...rest
}) => (
  <FigureWrapper {...rest}>
    <Paper
      elevation={0}
      component="figure"
      style={{ margin: 0 }}
    >
      <Box m={0} p={1}>
        <Box component="figcaption" px={2} pt={1} mb={1}>
          <Grid
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                variant="h6"
                component="span"
                style={{ margin: 0 }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>{captionComponent}</Grid>
          </Grid>
        </Box>
        <Box pb={1} px={1}>
          {children}
        </Box>
      </Box>
    </Paper>
  </FigureWrapper>
);

Figure.propTypes = {
  captionComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

Figure.defaultProps = {};

export default Figure;
