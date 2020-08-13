import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Header = ({
  backComponent,
  navComponent,
  children,
  title,
}) => (
  <Box
    style={{
      borderBottom: navComponent
        ? '2px solid #f5f7f9'
        : undefined,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'white',
    }}
    pt={1}
    width="100%"
  >
    <Container
      maxWidth="xl"
      component="header"
      style={{ padding: '0 1.5rem' }}
    >
      <Grid
        container
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            id="q3-app-title"
          >
            {backComponent}
            <Typography
              style={{
                display: 'inline-block',
                paddingLeft: backComponent ? '1rem' : 0,
              }}
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Container>
    {navComponent && (
      <Box
        style={{ backgroundColor: '#FFF' }}
        zIndex={10}
        position="sticky"
        top="0"
      >
        {navComponent}
      </Box>
    )}
  </Box>
);

Header.propTypes = {
  /**
   * Intended for a button of some sort.
   */
  backComponent: PropTypes.node,
  /**
   * Populates the toolbar region of the Header.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]),

  navComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Populates the H1 element of this component.
   */
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  backComponent: null,
  children: null,
  navComponent: null,
};

export default Header;
