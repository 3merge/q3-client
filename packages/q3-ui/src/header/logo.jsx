import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useStyles from './useStyles';

const Logo = ({
  logoImgSrc,
  name,
  logoStyles,
  to,
  ...rest
}) => {
  const { logo } = useStyles(rest);

  return logoImgSrc ? (
    <Link to={to} className={logo} style={logoStyles}>
      <LazyLoadImage src={logoImgSrc} alt={name} />
    </Link>
  ) : (
    <Typography variant="h4" component="h1" color="inherit">
      {name}
    </Typography>
  );
};

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string,
  logoStyles: PropTypes.shape({}),
  to: PropTypes.string,
};

Logo.defaultProps = {
  logoImgSrc: null,
  logoStyles: null,
  to: '/',
};

export default Logo;
