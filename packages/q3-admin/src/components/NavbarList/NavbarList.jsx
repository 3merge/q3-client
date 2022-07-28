import React from 'react';
import PropTypes from 'prop-types';
import { List, ListSubheader } from '@material-ui/core';
import { isObject, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import NavbarListItem from '../NavbarListItem';

const NavbarList = ({ items }) => {
  const { t } = useTranslation('labels');

  return isObject(items)
    ? Object.entries(items).map(([title, listItems]) => (
        <List
          style={{ flex: 1 }}
          key={`${title}-menu-items`}
          subheader={
            title &&
            title !== 'undefined' && (
              <ListSubheader
                disableGutters
                disableSticky
                component="li"
              >
                {t(title)}
              </ListSubheader>
            )
          }
        >
          {map(listItems, (listItem) => (
            <NavbarListItem
              {...listItem}
              key={`${title}-${listItem.label}`}
            />
          ))}
        </List>
      ))
    : null;
};

NavbarList.propTypes = {
  // eslint-disable-next-line
  items: PropTypes.object.isRequired,
};

export default NavbarList;
