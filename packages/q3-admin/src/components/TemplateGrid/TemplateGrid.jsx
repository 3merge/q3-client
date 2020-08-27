import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TemplateNavigation from '../TemplateNavigation';

const TemplateGrid = ({
  children,
  asideComponent,
  ...etc
}) => (
  <TemplateNavigation {...etc}>
    <Grid item md={4} xs={12} component="aside">
      {asideComponent}
    </Grid>
    <Grid item md={8} xs={12} component="article">
      {children}
    </Grid>
  </TemplateNavigation>
);

TemplateGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  asideComponent: PropTypes.node.isRequired,
};

TemplateGrid.defaultProps = {};

export default TemplateGrid;
