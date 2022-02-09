import React from 'react';
import { Link } from '@reach/router';
import useStyle from './styles';
import useDomainContext from '../../hooks/useDomainContext';

const Logo = () => {
  const cls = useStyle();
  const { directory = '/', domain = {} } =
    useDomainContext();

  const { brand, logo } = domain;

  return (
    <Link className={cls.link} to={directory}>
      <img alt={brand} className={cls.img} src={logo} />
    </Link>
  );
};

Logo.defaultProps = {};
Logo.propTypes = {};

export default Logo;
