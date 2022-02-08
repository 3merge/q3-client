import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import useStyle from './styles';
import useDomainContext from '../../hooks/useDomainContext';

const Logo = ({ to }) => {
  const cls = useStyle();
  const { domain = {} } = useDomainContext();
  const { brand, logo } = domain;

  return (
    <Link className={cls.link} to={to}>
      <img alt={brand} className={cls.img} src={logo} />
    </Link>
  );
};

Logo.defaultProps = {
  to: '/',
};

Logo.propTypes = {
  to: PropTypes.string,
};

export default Logo;
