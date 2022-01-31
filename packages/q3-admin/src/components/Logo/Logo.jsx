import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import useStyle from './styles';

const Logo = ({ className, src, to }) => {
  const cls = useStyle();

  return (
    <Link
      className={classnames(cls.link, className)}
      to={to}
    >
      <img alt="App logo" className={cls.img} src={src} />
    </Link>
  );
};

Logo.defaultProps = {
  className: undefined,
  to: '/',
};

Logo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default Logo;
