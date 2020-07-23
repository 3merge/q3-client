import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Template from '../Template';

const TemplateGrid = ({
  children,
  title,
  asideComponent,
}) => (
  <Template>
    <Grid container spacing={1}>
      <Grid item xs={12} component="header">
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Grid item md={4} xs={12} component="aside">
        {asideComponent}
      </Grid>
      <Grid item md={8} xs={12} component="article">
        {children}
      </Grid>
    </Grid>
  </Template>
);

TemplateGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  asideComponent: PropTypes.node.isRequired,
};

export default TemplateGrid;
