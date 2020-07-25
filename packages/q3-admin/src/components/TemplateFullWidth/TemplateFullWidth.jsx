import React from 'react';
import PropTypes from 'prop-types';
import Tile from 'q3-ui/lib/tile';
import Container from '@material-ui/core/Container';
import Template from '../Template';

const TemplateFullWidth = ({ children, ...etc }) => (
  <Template>
    <Container maxWidth="md" component="article">
      <Tile {...etc} divider>
        {children}
      </Tile>
    </Container>
  </Template>
);

TemplateFullWidth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default TemplateFullWidth;
