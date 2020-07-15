import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Figure = ({
  captionComponent,
  children,
  fullWidth,
  title,
}) => (
  <Grid item xs={12} lg={fullWidth ? 12 : 6}>
    <Paper
      component="figure"
      elevation={0}
      style={{ margin: 0 }}
    >
      <Box component="figcaption" px={2} pt={1} mb={-2}>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h6" component="span">
              {title}
            </Typography>
          </Grid>
          <Grid item>{captionComponent}</Grid>
        </Grid>
      </Box>
      <Box height={450} pb={1} px={1}>
        {children}
      </Box>
    </Paper>
  </Grid>
);

Figure.propTypes = {
  captionComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Figure.defaultProps = {
  fullWidth: false,
};

export default Figure;
