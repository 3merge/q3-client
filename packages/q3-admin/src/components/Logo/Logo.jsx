import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import { Link } from '@reach/router';
import Hidden from '@material-ui/core/Hidden';
import useStyle from './styles';

const Logo = ({ src }) => {
  const cls = useStyle();

  return (
    <Hidden mdDown>
      <Link to="." className={cls.logo}>
        <Image
          alt="Logo"
          fluid={{
            src,
          }}
        />
      </Link>
    </Hidden>
  );
};

Logo.defaultProps = {
  src: '',
};

Logo.propTypes = {
  src: PropTypes.string,
};

export default Logo;
