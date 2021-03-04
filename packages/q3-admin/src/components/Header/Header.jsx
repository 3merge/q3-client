import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyle from './useStyle';

const Header = ({
  backComponent,
  navComponent,
  subtitleComponent,
  children,
  title,
}) => {
  const cls = useStyle({
    backComponent,
    navComponent,
  });

  return (
    <Box className={cls.root} pt={1} width="100%">
      <Container
        maxWidth="xl"
        component="header"
        className={cls.header}
      >
        <Grid container justify="space-between">
          <Grid item>
            <Box display="flex" id="q3-app-title">
              {backComponent}
              <Box ml={2}>
                <Typography
                  className={cls.title}
                  variant="h5"
                  component="h2"
                >
                  {title}
                </Typography>
                {subtitleComponent}
              </Box>
            </Box>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
      {navComponent && (
        <Box id="q3-app-subnav">{navComponent}</Box>
      )}
    </Box>
  );
};

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
