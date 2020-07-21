import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Figure = ({
  paperStyles,
  captionComponent,
  children,
  fullWidth,
  title,
}) => (
  <Grid item xs={12} lg={fullWidth ? 12 : 6}>
    <Box component="figure" m={0} p={1} style={paperStyles}>
      <Box component="figcaption" px={2} pt={1} mb={1}>
        <Grid container justify="space-between" spacing={3}>
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
  </Grid>
);

Figure.propTypes = {
  captionComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  title: PropTypes.string.isRequired,
  paperStyles: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
};

Figure.defaultProps = {
  fullWidth: false,
  paperStyles: {},
};

export default Figure;
