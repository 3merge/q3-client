import React from 'react';
import Typography from '@material-ui/core/Typography';

export default {
  title: 'Components/Theme',
};

export const ResponsiveTypography = () => (
  <>
    <Typography variant="overline">Overline</Typography>
    <Typography variant="h1">Heading one</Typography>
    <Typography variant="h2">Heading two</Typography>
    <Typography variant="h3">Heading three</Typography>
    <Typography variant="h4">Heading four</Typography>
    <Typography variant="h5">Heading five</Typography>
    <Typography variant="h6">Heading size</Typography>
    <Typography variant="body2">Body 2</Typography>
    <Typography>Body</Typography>
  </>
);
