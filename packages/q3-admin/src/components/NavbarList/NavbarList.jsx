import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from '@material-ui/core';
import { isObject, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import NavbarListItem from '../NavbarListItem';
import useStyle from './styles';
import useAccountPages from '../../hooks/useAccountPages';

const NavbarList = ({ items }) => {
  const { t } = useTranslation('labels');
  const account = useAccountPages();
  const cls = useStyle();

  return isObject(items)
    ? Object.entries({ ...items, account }).map(
        ([title, listItems], idx) => (
          <List
            key={`${title}-${idx}-menu-items`}
            subheader={
              title && title !== 'undefined' ? (
                <Typography
                  className={cls.subheader}
                  variant="overline"
                  component="li"
                >
                  {t(title)}
                </Typography>
              ) : undefined
            }
          >
            {map(listItems, (listItem, subIdx) => (
              <NavbarListItem
                {...listItem}
                key={`${title}-${idx}-${subIdx}-${listItem.label}`}
              />
            ))}
          </List>
        ),
      )
    : null;
};

NavbarList.propTypes = {
  // eslint-disable-next-line
  items: PropTypes.object.isRequired,
};

export default NavbarList;
