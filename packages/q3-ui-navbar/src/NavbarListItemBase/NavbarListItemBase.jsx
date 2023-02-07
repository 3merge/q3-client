import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { lowerCase, omit } from 'lodash';
import ListItemSecondaryActionPosition from '../ListItemSecondaryActionPosition';
import useStyle from './styles';

const NavbarListItemBase = ({
  arrow,
  className,
  children,
  icon: Icon,
  label,
  matches,
  selected,
  badge,
  ...props
}) => {
  const cls = useStyle({
    matches,
    selected,
  });

  return (
    <li
      data-list-item={lowerCase(label)}
      className={className}
    >
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
        <ListItemSecondaryActionPosition
          arrow={arrow}
          badge={badge}
          state={selected}
        />
      </ListItem>
      {children}
    </li>
  );
};

NavbarListItemBase.defaultProps = {
  arrow: false,
  badge: 0,
  children: null,
  className: undefined,
  icon: null,
  matches: false,
  selected: false,
};

NavbarListItemBase.propTypes = {
  arrow: PropTypes.bool,
  badge: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  matches: PropTypes.bool,
  selected: PropTypes.bool,
};

export default NavbarListItemBase;
