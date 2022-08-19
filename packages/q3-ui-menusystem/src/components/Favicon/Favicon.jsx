import React from 'react';
import DirectoryLink from '../DirectoryLink';
import MenuSystemContext from '../MenuSystemContext';
import useStyle from './styles';

const Logo = () => {
  const {
    domain: { brand, favicon, ...rest },
  } = React.useContext(MenuSystemContext);
  const cls = useStyle(rest);

  return (
    <DirectoryLink className={cls.link}>
      <img alt={brand} className={cls.img} src={favicon} />
    </DirectoryLink>
  );
};

Logo.defaultProps = {};
Logo.propTypes = {};

export default Logo;
