import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

export default ({
  label,
  imgSrc,
  title,
  subtitle,
  even,
  reverse,
  body,
  muted,
}) => (
  <div style={{ backgroundColor: muted ? grey[100] : 'transparent' }}>
    <Container maxWidth="xl">
      <Box my={1} py={3}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
            direction={reverse ? 'row' : 'row-reverse'}
          >
            <Grid item xs={even ? 6 : 4}>
              <Box align="center">
                <img
                  src={imgSrc}
                  style={{
                    maxWidth: '100%',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={even ? 6 : 7}>
              <Container maxWidth="sm">
                <Typography variant="overline" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h5" component="h4" gutterBottom>
                  {subtitle}
                </Typography>
                <Typography variant="body1">{body}</Typography>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  </div>
);
