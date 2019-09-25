import React from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const hasAction = (obj, render) =>
  obj && typeof obj === 'object' && 'href' in obj ? (
    <Grid item>{render(obj.href, obj.label)}</Grid>
  ) : null;

const IntersectionButton = ({ children, href, ...rest }) => (
  <Button component={Link} {...rest} to={href} size="large">
    {children}
  </Button>
);

const BannerActions = ({ primaryAction, secondaryAction, justify }) =>
  primaryAction || secondaryAction ? (
    <Box mt={4}>
      <Grid container spacing={1} alignItems="center" justify={justify}>
        {hasAction(primaryAction, (href, label) => (
          <IntersectionButton
            href={href}
            variant="contained"
            color="secondary"
            size="large"
          >
            {label}
          </IntersectionButton>
        ))}
        {hasAction(secondaryAction, (href, label) => (
          <IntersectionButton
            href={href}
            variant="outlined"
            color="primary"
            size="large"
          >
            {label}
          </IntersectionButton>
        ))}
      </Grid>
    </Box>
  ) : null;

export default BannerActions;
