import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useStyles from './useStyles';

const Logo = ({ logoImgSrc, name }) => {
  const { logo } = useStyles();

  return logoImgSrc ? (
    <Link to="/" className={logo}>
      <LazyLoadImage src={logoImgSrc} alt={name} />
    </Link>
  ) : (
    <Typography
      variant="h3"
      style={{ padding: '0 1rem' }}
      component="h1"
      color="inherit"
    >
      {name}
    </Typography>
  );
};

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string,
};

Logo.defaultProps = {
  logoImgSrc: null,
};

export default Logo;
