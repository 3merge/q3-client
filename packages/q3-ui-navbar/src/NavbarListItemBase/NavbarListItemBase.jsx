import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { omit } from 'lodash';
import ListItemArrow from '../ListItemArrow';
import useStyle from './styles';

const NavbarListItemBase = ({
  arrow,
  children,
  icon: Icon,
  label,
  matches,
  selected,
  ...props
}) => {
  const cls = useStyle({
    matches,
    selected,
  });

  return (
    <li>
      <ListItem
        button
        classes={{
          selected: cls.selected,
          root: cls.button,
        }}
        selected={selected}
        {...omit(props, ['collectionName'])}
      >
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={label} />
        {arrow && <ListItemArrow state={selected} />}
      </ListItem>
      {children}
    </li>
  );
};

NavbarListItemBase.defaultProps = {
  arrow: false,
  children: null,
  icon: null,
  matches: false,
  selected: false,
};

NavbarListItemBase.propTypes = {
  arrow: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  matches: PropTypes.bool,
  selected: PropTypes.bool,
};

export default NavbarListItemBase;
