import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import useStyle from './styles';

const Logo = ({ src, to }) => {
  const cls = useStyle();

  return (
    <Link className={cls.link} to={to}>
      <img alt="App logo" className={cls.img} src={src} />
    </Link>
  );
};

Logo.defaultProps = {
  to: '/',
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default Logo;
