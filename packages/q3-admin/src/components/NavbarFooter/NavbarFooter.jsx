import React from 'react';
import { List } from '@material-ui/core';
import NavbarProfileLink from '../NavbarProfileLink';
import NavbarSystemLink from '../NavbarSystemLink';
import useStyle from './styles';

const NavbarFooter = () => {
  const cls = useStyle();

  return (
    <List component="div" className={cls.root}>
      <NavbarProfileLink />
      <NavbarSystemLink />
    </List>
  );
};

NavbarFooter.defaultProps = {};
NavbarFooter.propTypes = {};

export default NavbarFooter;
