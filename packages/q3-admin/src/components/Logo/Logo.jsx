import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import useStyle from './styles';

const Logo = ({ src }) => {
  const cls = useStyle();

  return (
    <Link className={cls.link} to="/">
      <img alt="App logo" className={cls.img} src={src} />
    </Link>
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Logo;
