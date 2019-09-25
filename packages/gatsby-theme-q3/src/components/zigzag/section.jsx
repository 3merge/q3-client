import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const isSet = ([prop, variant, color]) =>
  prop && (
    <Typography
      variant={variant}
      gutterBottom
      style={{ color: color ? color[900] : null }}
    >
      {prop}
    </Typography>
  );

const Section = ({
  align,
  label,
  title,
  imgSrc,
  subtitle,
  body,
  backgroundColor,
  index,
}) => (
  <Grid
    container
    spacing={8}
    alignItems={align}
    direction={index % 2 ? 'row-reverse' : 'row'}
  >
    <Grid item xs={6}>
      <img src={imgSrc} alt={title} style={{ maxWidth: '100%' }} />
    </Grid>
    <Grid item xs={6}>
      <Container maxWidth="xs">
        {[
          [label, 'overline', backgroundColor],
          [title, 'h3'],
          [subtitle, 'h4'],
          [body, 'body1'],
        ].map(isSet)}
      </Container>
    </Grid>
  </Grid>
);

Section.defaultProps = {
  align: 'center',
};

export default Section;
