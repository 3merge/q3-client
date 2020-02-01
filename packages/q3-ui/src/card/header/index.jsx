import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Header = ({ title, name, description }) => (
  <Box my={1}>
    {name && (
      <Typography
        variant="overline"
        gutterBottom
        color="primary"
      >
        {name}
      </Typography>
    )}
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
    <Typography gutterBottom>{description}</Typography>
  </Box>
);

Header.propTypes = {
  /**
   * Card title text.
   */
  title: PropTypes.string.isRequired,

  /**
   * Card description text.
   */
  description: PropTypes.string.isRequired,

  /**
   * Card overline text.
   */
  name: PropTypes.string,
};

Header.defaultProps = {
  name: null,
};

export default Header;
