import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tile from 'q3-ui/lib/tile';
import Template from '../Template';

const getGridStyle = (el) =>
  el
    ? {
        paddingTop: '2rem',
        borderTop: '2px solid #f4f4f5',
        marginTop: 0,
      }
    : {};

const TemplateGrid = ({
  children,
  asideComponent,
  navComponent,
  ...etc
}) => (
  <Template>
    <Container maxWidth="md" component="article">
      <Tile {...etc} divider={!navComponent}>
        {navComponent}
        <Grid
          container
          spacing={1}
          style={getGridStyle(navComponent)}
        >
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
  navComponent: PropTypes.node,
};

TemplateGrid.defaultProps = {
  navComponent: null,
};

export default TemplateGrid;
