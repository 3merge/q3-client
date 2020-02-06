import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyle';

const Logo = ({ name }) => {
  const { logo, logoText, showOnHover } = useStyles();

  return (
    <Link to="/" aria-label={name} className={logoText}>
      <Grid
        container
        alignItems="center"
        className={showOnHover}
      >
        <Grid item>
          <Box ml={1} className={logo}>
            <svg viewBox="0 0 1000 1000">
              <g>
                <polygon points="509.9,657.01 423.84,570.95 490.68,570.95 576.74,657.01 	" />
                <polygon points="509.32,429.05 423.26,342.99 490.1,342.99 576.16,429.05 	" />
                <polygon points="576.45,456.97 490.39,543.03 423.55,543.03 509.61,456.97 	" />
              </g>
            </svg>
          </Box>
        </Grid>
        <Grid item>
          <Typography
            id="logo-text"
            variant="h1"
            style={{ textTransform: 'uppercase' }}
          >
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

Logo.propTypes = {
  /**
   * Brand to display with 3merge icon.
   */
  name: PropTypes.string.isRequired,
};

export default Logo;
