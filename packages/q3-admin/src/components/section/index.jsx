import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export const getSectionSize = (fn) =>
  typeof fn === 'function'
    ? {
        lg: 8,
        md: 7,
        sm: 6,
      }
    : {
        sm: 6,
        xs: 12,
      };

const Section = ({ fetching, children, renderSidebar }) => (
  <Container maxWidth="xl">
    <Box my={4}>
      <Grid container spacing={1}>
        <Grid
          {...getSectionSize(renderSidebar)}
          component="section"
          item
        >
          {fetching ? <CircularProgress /> : children}
        </Grid>
        {renderSidebar && renderSidebar()}
      </Grid>
    </Box>
  </Container>
);

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]),
  fetching: PropTypes.bool,
  renderSidebar: PropTypes.func,
};

Section.defaultProps = {
  fetching: false,
  renderSidebar: null,
  children: null,
};

export default Section;
