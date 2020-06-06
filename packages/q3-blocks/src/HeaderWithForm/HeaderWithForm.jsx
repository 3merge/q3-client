import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContentBackgroundImage from '../ContentBackgroundImage';

const FormWithFeaturedBackgroundImage = ({
  title,
  description,

  children,
  ...rest
}) => (
  <Box py={8} position="relative">
    <ContentBackgroundImage {...rest} />
    <Box position="relative" style={{ color: '#FFF' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Box maxWidth="400px">
              <Typography
                variant="h1"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography color="inherit">
                {description}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper elevation={14}>{children}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
);

FormWithFeaturedBackgroundImage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default FormWithFeaturedBackgroundImage;
