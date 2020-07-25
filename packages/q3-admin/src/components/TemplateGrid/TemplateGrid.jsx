import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tile from 'q3-ui/lib/tile';
import Template from '../Template';

const TemplateGrid = ({
  children,

  asideComponent,
  ...etc
}) => (
  <Template>
    <Container maxWidth="md" component="article">
      <Tile {...etc} divider>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12} component="aside">
            {asideComponent}
          </Grid>
          <Grid item md={8} xs={12} component="article">
            {children}
          </Grid>
        </Grid>
      </Tile>
    </Container>
  </Template>
);

TemplateGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  asideComponent: PropTypes.node.isRequired,
};

export default TemplateGrid;
