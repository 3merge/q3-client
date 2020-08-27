import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TemplateNavigation from '../TemplateNavigation';

const TemplateFullWidth = ({
  asideComponent,
  children,
  ...etc
}) => (
  <TemplateNavigation {...etc}>
    {asideComponent && (
      <Grid item md={4} xs={12} component="aside">
        {asideComponent}
      </Grid>
    )}
    <Grid item xs component="article">
      {children}
    </Grid>
  </TemplateNavigation>
);

TemplateFullWidth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  asideComponent: PropTypes.node,
};

TemplateFullWidth.defaultProps = {
  asideComponent: null,
};

export default TemplateFullWidth;
