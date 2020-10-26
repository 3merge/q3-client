import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import useStyles from './useStyle';

const Logo = ({ name, to }) => {
  const { logo } = useStyles();

  return (
    <Link
      id="q3"
      to={to}
      aria-label={name}
      className={logo}
    >
      <svg viewBox="0 0 1000 1000">
        <g>
          <polygon points="509.9,657.01 423.84,570.95 490.68,570.95 576.74,657.01 	" />
          <polygon points="509.32,429.05 423.26,342.99 490.1,342.99 576.16,429.05 	" />
          <polygon points="576.45,456.97 490.39,543.03 423.55,543.03 509.61,456.97 	" />
        </g>
      </svg>
    </Link>
  );
};

Logo.propTypes = {
  /**
   * Brand for alt attribute.
   */
  name: PropTypes.string.isRequired,

  /**
   * Link destination for logo
   */
  to: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
};

export default Logo;
