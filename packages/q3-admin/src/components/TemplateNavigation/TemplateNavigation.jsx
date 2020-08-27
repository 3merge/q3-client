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

const TemplateNavigation = ({
  children,
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
          {children}
        </Grid>
      </Tile>
    </Container>
  </Template>
);

TemplateNavigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  navComponent: PropTypes.node,
};

TemplateNavigation.defaultProps = {
  navComponent: null,
};

export default TemplateNavigation;
